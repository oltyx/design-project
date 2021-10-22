/**
 * Object to store all data of an interval.
 * @field name      start time of the interval
 * @field pv        solar power in this interval
 * @field charge    power used to charge the EV
 */
export type ChargingData = {name: string, pv: number, charge: number};

/**
 * Dummy data of solar power, used as 'desired profile' for now.
 */
const dummy_solar = [
  {name: "0:00", pv: 0},
  {name: "0:15", pv: 0},
  {name: "0:30", pv: 0},
  {name: "0:45", pv: 0},
  {name: "1:00", pv: 0},
  {name: "1:15", pv: 0},
  {name: "1:30", pv: 0},
  {name: "1:45", pv: 0},
  {name: "2:00", pv: 0},
  {name: "2:15", pv: 0},
  {name: "2:30", pv: 0},
  {name: "2:45", pv: 0},
  {name: "3:00", pv: 0},
  {name: "3:15", pv: 0},
  {name: "3:30", pv: 0},
  {name: "3:45", pv: 0},
  {name: "4:00", pv: 0},
  {name: "4:15", pv: 0},
  {name: "4:30", pv: 0},
  {name: "4:45", pv: 0},
  {name: "5:00", pv: 0},
  {name: "5:15", pv: 11},
  {name: "5:30", pv: 64},
  {name: "5:45", pv: 195},
  {name: "6:00", pv: 408},
  {name: "6:15", pv: 653},
  {name: "6:30", pv: 1048},
  {name: "6:45", pv: 1482},
  {name: "7:00", pv: 1927},
  {name: "7:15", pv: 2443},
  {name: "7:30", pv: 3197},
  {name: "7:45", pv: 3925},
  {name: "8:00", pv: 4603},
  {name: "8:15", pv: 5362},
  {name: "8:30", pv: 6090},
  {name: "8:45", pv: 6770},
  {name: "9:00", pv: 7419},
  {name: "9:15", pv: 8106},
  {name: "9:30", pv: 8711},
  {name: "9:45", pv: 9182},
  {name: "10:00", pv: 9806},
  {name: "10:15", pv: 10291},
  {name: "10:30", pv: 10784},
  {name: "10:45", pv: 11153},
  {name: "11:00", pv: 11476},
  {name: "11:15", pv: 11744},
  {name: "11:30", pv: 11523},
  {name: "11:45", pv: 11401},
  {name: "12:00", pv: 11278},
  {name: "12:15", pv: 10207},
  {name: "12:30", pv: 9965},
  {name: "12:45", pv: 11060},
  {name: "13:00", pv: 11744},
  {name: "13:15", pv: 10741},
  {name: "13:30", pv: 13662},
  {name: "13:45", pv: 13537},
  {name: "14:00", pv: 13460},
  {name: "14:15", pv: 12972},
  {name: "14:30", pv: 12093},
  {name: "14:45", pv: 11274},
  {name: "15:00", pv: 12310},
  {name: "15:15", pv: 12201},
  {name: "15:30", pv: 11863},
  {name: "15:45", pv: 11127},
  {name: "16:00", pv: 11393},
  {name: "16:15", pv: 10807},
  {name: "16:30", pv: 7817},
  {name: "16:45", pv: 7776},
  {name: "17:00", pv: 9218},
  {name: "17:15", pv: 8739},
  {name: "17:30", pv: 7727},
  {name: "17:45", pv: 3886},
  {name: "18:00", pv: 5691},
  {name: "18:15", pv: 2157},
  {name: "18:30", pv: 1702},
  {name: "18:45", pv: 4394},
  {name: "19:00", pv: 4030},
  {name: "19:15", pv: 3198},
  {name: "19:30", pv: 2043},
  {name: "19:45", pv: 1776},
  {name: "20:00", pv: 1297},
  {name: "20:15", pv: 846},
  {name: "20:30", pv: 578},
  {name: "20:45", pv: 352},
  {name: "21:00", pv: 153},
  {name: "21:15", pv: 159},
  {name: "21:30", pv: 15},
  {name: "21:45", pv: 0},
  {name: "22:00", pv: 0},
  {name: "22:15", pv: 0},
  {name: "22:30", pv: 0},
  {name: "22:45", pv: 0},
  {name: "23:00", pv: 0},
  {name: "23:15", pv: 0},
  {name: "23:30", pv: 0},
  {name: "23:45", pv: 0}
]

/**
 * Retrieve only the PV values of the data frame.
 */
export function getSolarPower(): number[] {
    // Using dummy data, replace with API call
    return dummy_solar.map((x) => {return x.pv})
}

/**
 * Retrieve the starts of the intervals from the data frame.
 */
export function getIntervals(): string[] {
    // Using dummy data, replace with API call
    return dummy_solar.map(x => {return x.name})
}

/**
 * Combines the solar power data with the planned charging session to make a complete dataframe for the graph.
 * @param intervals the interval labels, should be pruned already to include only the relevant intervals.
 * @param solars    the solar power data, should be equally long as {@param intervals}.
 * @param charges   planned charging values, should be equally long as {@param solars} and {@param intervals}.
 */
export function zipData(intervals: string[], solars: number[], charges: number[]): ChargingData[] {
    let res: ChargingData[] = [];

    for (let i = 0; i < intervals.length; i++) {
        res.push({name: intervals[i], pv: solars[i], charge: charges[i]});
    }

    return res;
}