// ---- BEGIN CONSTANTS ----

/**
 * Average energy consumption of an EV, in Wh per km.
 * Source: https://ev-database.org/cheatsheet/energy-consumption-electric-car
 */
const ENERGY_CONSUMPTION : number = 194;

/**
 * Average CO2 emissions of grid energy, in g per Wh.
 * Source: https://nl.econologie.com/europe-emissie-co2-country-kwh-elektriciteit/
 */
const CO2_EMISSIONS_GRID : number = 0.642;

/**
 * Average CO2 emissions of solar energy, in g per Wh.
 * Source: https://www.treehugger.com/how-much-co-does-one-solar-panel-create-4868753
 */
const CO2_EMISSIONS_SOLAR : number = 0.050;

/**
 * Average price of grid energy, in €/W.
 * Source: https://www.consumentenbond.nl/energie-vergelijken/kwh-prijs
 */
const PRICE_GRID : number = 0.00024;

/**
 * Price of solar energy, in €/W.
 * This is half the price of grid energy for now.
 */
const PRICE_SOLAR : number = 0.00012;

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