// ---- BEGIN CONSTANTS ----

/**
 * Average energy consumption of an EV, in Wh per km.
 * Source: https://ev-database.org/cheatsheet/energy-consumption-electric-car
 */
const ENERGY_CONSUMPTION : number = 194;

// ---- END CONSTANTS ----

/**
 * Converts to Wh based on ENERGY_CONSUMPTION.
 * @param km range in kms
 */
export function kmToWh(km: number): number {
    return km * ENERGY_CONSUMPTION;
}

/**
 * Converts to km range based on ENERGY_CONSUMPTION.
 * @param Wh
 * @constructor
 */
export function WhToKm(Wh: number): number {
    return Wh / ENERGY_CONSUMPTION;
}