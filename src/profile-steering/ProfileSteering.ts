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
function discreteBufferPlanningPositive(desired: number[][], chargeRequired: number, chargingPowers: number[],
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

    let slopes: number[] = [];

    // Body of the algorithm
    console.error("Not (fully) implemented yet"); //TODO implement

    return result;
}