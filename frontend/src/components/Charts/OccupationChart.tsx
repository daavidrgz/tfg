import { Person } from "@/model/person";
import { getOccupationColors } from "@/utils/colors";
import { DivProps } from "@/utils/defaultInterfaces";
import Chart from "@/components/Charts/Chart";
import { OccupationSchema } from "@/model/occupation";
import InfoCard from "./InfoCard/InfoCard";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { capitalize } from "@/utils/formatter";

interface Props extends DivProps {
  people: Person[];
  selectedPerson: Person | null;
}

export default function OccupationChart({
  people,
  selectedPerson,
  ...rest
}: Props) {
  // get a list of the number of people of each occupation and its name
  // e.g. [{name: "sports", count: 10}, {name:"music", count: 5}, ...]
  const occupationCount = people.reduce(
    (acc: { name: string; count: number }[], person) => {
      const occupation = person.occupation!;
      const index = acc.findIndex((item) => item.name === occupation);
      if (index >= 0) {
        acc[index].count++;
      } else {
        acc.push({ name: occupation, count: 1 });
      }
      return acc;
    },
    []
  );

  occupationCount.sort((a, b) => b.count - a.count);

  return (
    <Chart
      people={people}
      selectedPerson={selectedPerson}
      title={"OCCUPATION DISTRIBUTION"}
      label="Number of people"
      entityEnum={OccupationSchema.Enum}
      colors={getOccupationColors()}
      chartType="pie"
      attribute="occupation"
      filtered
      dimmable
      direction="horizontal"
      {...rest}
    >
      <InfoCard
        title="MOST POPULAR"
        icon={<TrendingUpRoundedIcon />}
        mainValue={capitalize(occupationCount[0].name)}
        valueSize="s"
      />

      <InfoCard
        title="LEAST POPULAR"
        icon={<TrendingDownRoundedIcon />}
        mainValue={capitalize(occupationCount[occupationCount.length - 1].name)}
        valueSize="s"
      />
    </Chart>
  );
}