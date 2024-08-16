import { Flex, Image, Text } from "@mantine/core";
import { IHourlyProps } from "../../types/IHourlyProps.ts";
import { weatherCodes } from "../../constants/weatherCodesConstants.ts";
import WeatherInfoText from "../atoms/WeatherInfoText/WeatherInfoText.tsx";
const HourlyFullCard: React.FC<IHourlyProps> = ({ hourlyProps }) => {
  const {
    date,
    time,
    temperature_2m,
    weather_code,
    relative_humidity_2m,
    apparent_temperature,
    precipitation_probability,
    wind_speed_10m,
    wind_direction_10m,
    surface_pressure,
  } = hourlyProps;

  let imagePath = "";

  if (weather_code in weatherCodes) {
    imagePath = weatherCodes[weather_code];
  }

  const getWindDirection = (degree: number): string => {
    if (degree >= 0 && degree <= 11.25) return "N";
    if (degree > 11.25 && degree <= 33.75) return "NNE";
    if (degree > 33.75 && degree <= 56.25) return "NE";
    if (degree > 56.25 && degree <= 78.75) return "ENE";
    if (degree > 78.75 && degree <= 101.25) return "E";
    if (degree > 101.25 && degree <= 123.75) return "ESE";
    if (degree > 123.75 && degree <= 146.25) return "SE";
    if (degree > 146.25 && degree <= 168.75) return "SSE";
    if (degree > 168.75 && degree <= 191.25) return "S";
    if (degree > 191.25 && degree <= 213.75) return "SSW";
    if (degree > 213.75 && degree <= 236.25) return "SW";
    if (degree > 236.25 && degree <= 258.75) return "WSW";
    if (degree > 258.75 && degree <= 281.25) return "W";
    if (degree > 281.25 && degree <= 303.75) return "WNW";
    if (degree > 303.75 && degree <= 326.25) return "NW";
    if (degree > 326.25 && degree <= 348.75) return "NNW";
    if (degree > 348.75 && degree <= 360) return "N";
    return "Invalid";
  };

  return (
    <Flex
      w={350}
      h={200}
      bg="#BBD6EC"
      direction="column"
      m={5}
      style={{
        borderRadius: 20,
      }}
    >
      <Flex
        h="20%"
        bg="#AEC9DF"
        justify="space-between"
        p={10}
        align="center"
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Text fz={22} ta="center" lh={1} fw={700} m={5}>
          {time}
        </Text>
        <Text fz={22} ta="center" lh={1} fw={700} m={5}>
          {date}
        </Text>
      </Flex>
      <Flex p={10} w="100%" justify="space-between">
        <Flex direction="column" m={5} mt={20}>
          <Text fw={700} fz={30}>
            {~~temperature_2m}°С
          </Text>
          <WeatherInfoText
            text="Real feel"
            data={`${~~apparent_temperature}°С`}
          />
          <WeatherInfoText
            text={`Wind, km/h`}
            data={`${getWindDirection(wind_direction_10m)}, ${~~wind_speed_10m}`}
          />
          <WeatherInfoText
            text={"Pressure, hPa"}
            data={`${~~surface_pressure}`}
          />
        </Flex>
        <Flex direction="column" m={5}>
          <Image src={imagePath} w={75} h={75} />
          <WeatherInfoText
            text={"Humidity, %"}
            data={`${relative_humidity_2m}`}
          />
          <WeatherInfoText
            text={"Precipitation prob, %"}
            data={`${precipitation_probability}`}
          />
        </Flex>
      </Flex>
      {/* {date} <br />
      {temperature} С <br />
      {apparentTemperature} C <br />
      {sunrise} <br />
      {sunset} <br />
      {precipitation} <br />
      {windDirection} <br />
      {windSpeed} */}
    </Flex>
  );
};

export default HourlyFullCard;
