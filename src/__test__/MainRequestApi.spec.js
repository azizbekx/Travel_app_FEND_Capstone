import 'regenerator-runtime/runtime'
import { getWeather,getGeonami,getImage } from "../client/js/mainRequestAPI";



describe("Testing the getWeather funtion is functiom and exist", () => {
  test("Testing the getWeather() function", () => {
    expect(getWeather()).toBeDefined();
    expect(typeof getWeather()).toEqual("object");
    expect(getGeonami()).toBeDefined();
    expect(typeof getGeonami()).toEqual("object");
    expect(getImage()).toBeDefined();
    expect(typeof getImage()).toEqual("object")
  });
});
