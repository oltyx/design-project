/**
 * Plans the charging sessions based on the provided data to the functions.
 */
import {ChargingMode} from "../../data/models/ChargingMode";
import {getSolarPower, ChargingData, zipData, getIntervals} from "../../data/models/ChargingData";

// ---- BEGIN CONSTANTS ----

/**
 * Length of the time intervals, in minutes.
 */
export const INTERVAL_LENGTH : number = 15;

/**
 * Charging power levels supported by the EV, in W (hardcoded for now, should be retrieved).
 */
const CHARGING_POWERS : number[] = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000];

// ---- END CONSTANTS ----

/**
 * Computes the profile that finishes charging the fastest with the requirements set.
 * @param desired           The desired profile from the EMS, mainly for the intervals.
 * @param chargeRequired    The amount of charge the EV driver requires, in Wτ (τ = INTERVAL_LENGTH).
 * @param chargingPowers    The possible power levels the EV can be charged at, in W. Should be increasing.
 * @return result           The fastest profile it found.
 */
function discreteBufferPlanningFast(desired: number[], chargeRequired: number, chargingPowers: number[]): number[] {
    // Initialization, similar to the Smart Charging algorithm.
    let result: number[] = new Array(desired.length);
    for (let i = 0; i < result.length; i++) {result[i] = 0;}

    let remainingCharge: number = chargeRequired;
    let i: number = 0;

    // Fill up the profile with bars, disregarding the desired values completely.
    while (i < result.length && remainingCharge > 0.001) {
        // Select maximum possible charging power
        for (let j = chargingPowers.length - 1; j >= 0; j--) {
            if (remainingCharge - chargingPowers[j] >=0) {
                result[i] = chargingPowers[j];
                remainingCharge -= chargingPowers[j];
                break;
            }
        }
        i++;
    }

    return result;
}

/**
 * Computes an optimal profile with the requirements set.
 * @param desired           The desired profile from the EMS.
 * @param chargeRequired    The amount of charge the EV driver requires, in Wτ (τ = INTERVAL_LENGTH).
 * @param chargingPowers    The possible power levels the EV can be charged at, in W.
 * @param powerlimitsUpper  How much power the charger is able to take per time interval (W), empty by default.
 * @param prices            The price signals per time interval, or all zeroes by default.
 * @param beta              The rate of punishment, as a scalar for the cost. 1 by default.
 * @return result           The optimal profile it found.
 */
function discreteBufferPlanningSmart(desired: number[], chargeRequired: number, chargingPowers: number[],
                         powerlimitsUpper: number[] = [], prices: number[] | null = null, beta: number = 1): number[] {
    // Initialization of the algorithm
    let result:number[] = new Array(desired.length);
    for (let i = 0; i < result.length; i++) {result[i] = 0;}

    let remainingCharge: number = chargeRequired;

    if (prices == null) {
        prices = new Array(desired.length);
        for (let i = 0; i < prices.length; i++) {prices[i] = 0;}
    }

    chargingPowers.sort();
    console.assert(chargingPowers.length >= 1);

    let slopes: [number, [number, number]][] = [];

    // Body of the algorithm
    for (let i:number = 0; i < desired.length;i++) {
        // Calculate the first slopes
        // See if the next slope fits:
        if (powerlimitsUpper.length === 0 || chargingPowers[1] <= powerlimitsUpper[i]) {
            const slope: number = (prices[i] * chargingPowers[1] + beta * Math.pow(chargingPowers[1] - desired[i], 2)
                                - (prices[i] * chargingPowers[0] + beta * Math.pow(chargingPowers[0] - desired[i], 2))
                                ) / (chargingPowers[1] - chargingPowers[0]);

            // Add the association
            const pair: [number, number] = [i, 1];
            const association: [number, [number, number]] = [slope, pair];
            slopes.push(association);
        }
    }

    while (remainingCharge > 0.001 && slopes.length > 0) {
        // sort ascending instead of descending
        slopes.sort((m, n) => m[0] - n[0]);

        const i = slopes[0][1][0];
        const j = slopes[0][1][1];

        console.assert(j > 0);

        const sigma = Math.min(remainingCharge, chargingPowers[j] - chargingPowers[j-1]);
        result[i] += sigma;
        remainingCharge -= sigma;

        // delete first element
        slopes.splice(0,1);

        if (j < chargingPowers.length - 1) {
            if (powerlimitsUpper.length === 0 || chargingPowers[j+1] <= powerlimitsUpper[i]) {
                // Add new entry to replace
                const slope: number = (prices[i] * chargingPowers[j+1] + beta * Math.pow(chargingPowers[j+1] - desired[i], 2)
                                    - (prices[i] * chargingPowers[j] + beta * Math.pow(chargingPowers[j]  - desired[i], 2) )
                                    ) / (chargingPowers[j+1] - chargingPowers[j]);

                // Add the association
                const pair: [number, number] = [i, j+1];
                const association: [number, [number, number]] = [slope, pair];
                slopes.push(association);
            }
        }
    }

    return result;
}

/**
 * Retrieves all data needed and runs {@link #discreteBufferPlanningFast()} or {@link #discreteBufferPlanningSmart()}.
 * @param chargeRequired The amount of charge the EV driver requires, in Wτ (τ = INTERVAL_LENGTH).
 * @param endTime Hours and minutes of the departure time.
 * @param mode The charging mode (Fast or Smart), or null if not selected.
 * @returns The profile computed by the according algorithm.
 */
export function planEV(chargeRequired: number, endTime: [number, number], mode: ChargingMode|null): ChargingData[] {
    const desired: number[] = getSolarPower();
    const chargingPowers: number[] = CHARGING_POWERS; // Retrieve from back-end

    const now: Date = new Date();
    const startInterval: number = Math.round((now.getHours() * 60  + now.getMinutes()) / INTERVAL_LENGTH);
    const endInterval : number = Math.round((endTime[0] * 60  + endTime[1]) / INTERVAL_LENGTH);

    let result: number[];

    switch (mode) {
        case ChargingMode.Fast:
            result = discreteBufferPlanningFast(desired.slice(startInterval, endInterval), chargeRequired, chargingPowers);
            break;
        case ChargingMode.Smart:
            result = discreteBufferPlanningSmart(desired.slice(startInterval, endInterval), chargeRequired, chargingPowers);
            break;
        case null:
            result = new Array<number>(Math.max(0, endInterval - startInterval)).fill(0);
            break;
        default: throw Error("ChargingMode not supported");
    }

    return zipData(getIntervals().slice(startInterval, endInterval), desired.slice(startInterval, endInterval), result);
}