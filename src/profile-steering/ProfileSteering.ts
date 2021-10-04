// ---- BEGIN CONSTANTS ----
/**
 * Average energy consumption of an EV, in kWh per km.
 * Source: https://ev-database.org/cheatsheet/energy-consumption-electric-car
 */
const ENERGY_CONSUMPTION : number = 0.194;

/**
 * Average CO2 emissions of grid energy, in kg per kWh.
 * Source: https://nl.econologie.com/europe-emissie-co2-country-kwh-elektriciteit/
 */
const CO2_EMISSIONS_GRID : number = 0.642;

/**
 * Average CO2 emissions of solar energy, in kg per kWh.
 * Source: https://www.treehugger.com/how-much-co-does-one-solar-panel-create-4868753
 */
const CO2_EMISSIONS_SOLAR : number = 0.050;

/**
 * Length of the time intervals, in minutes.
 */
const INTERVAL_LENGTH : number = 15;

/**
 * Charging power levels supported by the EV.
 */
const CHARGING_POWERS: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

// ---- END CONSTANTS ----

/**
 * Computes an optimal profile with the requirements set.
 * @param desired           The desired profile from the EMS.
 * @param chargeRequired    The amount of charge the EV driver requires, in kWτ (τ = INTERVAL_LENGTH).
 * @param chargingPowers    The possible power levels the EV can be charged at, in kW.
 * @param powerlimitsUpper  How much power the charger is able to take per time interval (kW), empty by default.
 * @param prices            The price signals per time interval, or all zeroes by default.
 * @param beta              The rate of punishment, as a scalar for the cost. 1 by default.
 * @return result           The optimal profile it found.
 */
function discreteBufferPlanningPositive(desired: number[], chargeRequired: number, chargingPowers: number[],
             powerlimitsUpper: number[] = [], prices: number[] = null, beta: number = 1): number[] {
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
        if (powerlimitsUpper.length == 0 || chargingPowers[1] <= powerlimitsUpper[i]) {
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
        slopes.sort();

        const i = slopes[0][1][0];
        const j = slopes[0][1][1];

        console.assert(j > 0);

        const sigma = Math.min(remainingCharge, chargingPowers[j] - chargingPowers[j-1]);
        result[i] += sigma;
        remainingCharge -= sigma;

        slopes.pop();

        if (j < chargingPowers.length - 1) {
            if (powerlimitsUpper.length == 0 || chargingPowers[j+1] <= powerlimitsUpper[i]) {
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
 * Retrieves all data needed and runs {@link #discreteBufferPlanningPositive()}.
 */
function planEV() {
    const desired: number[] = [0,0,0,0,0,0,0,0,0]; // Fill in or retrieve
    const chargeRequired: number = -1; // Retrieve from UI

    const now: Date = new Date();
    const startTime: number = Math.round(now.getHours() * (60 / INTERVAL_LENGTH) + now.getMinutes() / INTERVAL_LENGTH);
    const endTime: number = 2; // Retrieve from UI and convert hours to INTERVAL_LENGTH

    // Print result to console for now, TODO display as graph
    console.log(discreteBufferPlanningPositive(desired.slice(startTime, endTime), chargeRequired, CHARGING_POWERS));
}