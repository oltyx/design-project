/**
 * Computes an optimal profile with the requirements set.
 * @param desired           The desired profile from the EMS.
 * @param chargeRequired    The amount of charge the EV driver requires.
 * @param chargingPowers    The possible power levels the EV can be charged at.
 * @param powerlimitsUpper  How much energy the charger is able to take per time interval, empty by default.
 * @param prices            The price signals per time interval, or all zeroes by default.
 * @param beta              The rate of punishment, as a scalar for the cost. 1 by default.
 * @return result           The optimal profile it found.
 */
function discreteBufferPlanningPositive(desired: number[], chargeRequired: number, chargingPowers: number[],
                                         powerlimitsUpper: number[] = [], prices: number[] = null, beta: number = 1):number[] {
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