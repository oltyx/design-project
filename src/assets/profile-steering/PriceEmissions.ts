import {ChargingData} from "../../data/models/ChargingData";

/**
 * Average CO2 emissions of grid energy, in g per Wh.
 * Source: https://nl.econologie.com/europe-emissie-co2-country-kwh-elektriciteit/
 */
const CO2_EMISSIONS_GRID : number = 642;

/**
 * Average CO2 emissions of solar energy, in g per Wh.
 * Source: https://www.treehugger.com/how-much-co-does-one-solar-panel-create-4868753
 */
const CO2_EMISSIONS_SOLAR : number = 50;

/**
 * Average price of grid energy, in €/kW.
 * Source: https://www.consumentenbond.nl/energie-vergelijken/kwh-prijs
 */
const PRICE_GRID : number = 0.24;

/**
 * Price of solar energy, in €/kW.
 * This is half the price of grid energy for now.
 */
const PRICE_SOLAR : number = 0.12;

export function getPrice(data: ChargingData[]): number {
    let res: number = 0;
    for (let i = 0; i < data.length; i++) {
        const [solar, grid]: [number, number] = [Math.min(data[i].pv,
            data[i].charge), Math.max(0, data[i].charge - data[i].pv)];
        res += PRICE_SOLAR * solar + PRICE_GRID * grid;
    }
    return res;
}

export function getEmissions(data: ChargingData[]): number {
    let res: number = 0;
    for (let i = 0; i < data.length; i++) {
        const [solar, grid]: [number, number] = [Math.min(data[i].pv, data[i].charge),
            Math.max(0, data[i].charge - data[i].pv)];
        res += CO2_EMISSIONS_SOLAR * solar + CO2_EMISSIONS_GRID * grid;
    }
    return res;
}