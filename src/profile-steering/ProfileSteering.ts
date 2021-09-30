/**
 * Computes an optimal profile with the requirements set.
 * @param desired           The desired profile from the EMS.
 * @param chargeRequired    The amount of charge the EV driver requires.
 * @param chargingPowers    The possible power levels the EV can be charged at.
 * @param powerlimitsUpper  How much energy the charger is able to take per time interval, empty by default.
 * @param prices            The price signals per time interval, or all zeroes by default.
 * @param beta              The rate of punishment, as a scalar for the cost. 1 by default.
 */
function discreteBufferPlanningPositive(desired: number[][], chargeRequired: number, chargingPowers: number[],
                                         powerlimitsUpper: number[] = [], prices: number[] = null, beta: number = 1) {
    console.error("Not yet implemented"); //TODO implement
}