import { faker } from "@faker-js/faker";
import randomColor from "randomcolor";
import moment from "moment";

export default function (groupCount = 10, itemCount = 30) {
  let randomSeed = Math.floor(Math.random() * 1000);
  let groups = [];
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: faker.person.firstName(),
      rightTitle: faker.person.lastName(),
      bgColor: randomColor({ luminosity: "light", seed: randomSeed + i }),
    });
  }

  let items = [];
  const currentTime = new Date().getTime();
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  for (let i = 0; i < itemCount; i++) {
    const startDate =
      currentTime + faker.number.int({ max: twentyFourHoursInMs });
    const endValue =
      startDate + faker.number.int({ min: 2, max: 20 }) * 15 * 60 * 1000;

    items.push({
      id: i + "",
      group: faker.number.int({ min: 1, max: groups.length }) + "",
      title: faker.hacker.phrase(),
      start: startDate,
      end: endValue,
      className:
        moment(startDate).day() === 6 || moment(startDate).day() === 0
          ? "item-weekend"
          : "",
      itemProps: {
        "data-tip": faker.hacker.phrase(),
      },
    });
  }

  items = items.sort((a, b) => a.start - b.start);

  return { groups, items };
}
