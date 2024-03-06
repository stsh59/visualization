"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const maleCount = {
  key: "male",
  value: 0,
};

const femaleCount = {
  key: "female",
  value: 0,
};

const FHIR_URL = process.env.NEXT_PUBLIC_FHIR_URL;

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [ageData, setAgeData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      return redirect("/auth/signin");
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await axios.get(`${FHIR_URL}/Patient?_count=500`);

        data.data.entry
          .map((data: any) => {
            return {
              value: data.resource.gender ?? "unspecified",
            };
          })
          .map((data: any) => {
            if (data.value == "male") {
              maleCount.value++;
            } else if (data.value == "female") {
              femaleCount.value++;
            }
          });
        setData([maleCount, femaleCount]);

        const ageCounts: { [key: string]: number } = {
          "0-2": 0,
          "3-16": 0,
          "17-30": 0,
          "31-45": 0,
          "46-65": 0,
          "65+": 0,
        };

        data.data.entry.forEach((entry: any) => {
          const birthYear = entry.resource.birthDate
            ? parseInt(entry.resource.birthDate.slice(0, 4))
            : undefined;
          if (birthYear) {
            const age = 2024 - birthYear;
            if (age <= 2) {
              ageCounts["0-2"]++;
            } else if (age <= 16) {
              ageCounts["3-16"]++;
            } else if (age <= 30) {
              ageCounts["17-30"]++;
            } else if (age <= 45) {
              ageCounts["31-45"]++;
            } else if (age <= 65) {
              ageCounts["46-65"]++;
            } else {
              ageCounts["65+"]++;
            }
          }
        });

        setAgeData(Object.entries(ageCounts));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <div className="flex items-center gap-16">
          {isLoading && <Loader2 className="m-16 h-16 w-16 animate-spin" />}

          {!isLoading && <BarChart data={ageData} label="Age Distribution" />}

          {!isLoading && (
            <Donut
              data={data}
              width={200}
              label1="Gender"
              label2="Distribution"
              height={200}
              innerRadius={60}
              outerRadius={100}
            />
          )}
        </div>
      </DefaultLayout>
    </>
  );
}

const Arc = ({
  data,
  index,
  createArc,
  colors,
  format,
  showLabel,
}: {
  data: any;
  index: any;
  createArc: any;
  colors: any;
  format: any;
  showLabel: boolean;
}) => (
  <g key={index} className="arc">
    <path className="arc" d={createArc(data)} fill={colors(index)} />

    <text
      transform={`translate(${createArc.centroid(data)})`}
      textAnchor="middle"
      fill="white"
      fontSize="10"
    >
      {!showLabel && format(data.value)}
      {showLabel && data.data.key}
    </text>
  </g>
);

const Donut = (props: any) => {
  const createPie = d3
    .pie()
    //@ts-ignore
    .value((d) => d.value)
    .sort(null);

  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);

  const colors = d3.scaleOrdinal(d3.schemeSet1);
  const format = d3.format(".2f");
  const data = createPie(props.data);

  return (
    <svg width={props.width} height={props.height}>
      <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
        {/* Add the text element for "Gender" */}
        <text
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="black"
          dy=".35em" // Adjust vertical alignment if needed
        >
          <tspan x="0" dy="0">
            {props.label1}
          </tspan>
          <tspan x="0" dy="1.2em">
            {props.label2 ? props.label2 : ""}
          </tspan>
        </text>
        {/* End of text element for "Gender" */}
        {data.map((d, i) => (
          <Arc
            key={i}
            index={i}
            data={d}
            createArc={createArc}
            colors={colors}
            format={format}
            showLabel={props.showLabel}
          />
        ))}
      </g>
    </svg>
  );
};

const Pie = (props: any) => {
  const createPie = d3
    .pie()
    //@ts-ignore
    .value((d) => d.value)
    .sort(null);

  const createArc = d3.arc().outerRadius(props.outerRadius).innerRadius(0); // Set innerRadius to 0 for a pie chart

  const colors = d3.scaleOrdinal(d3.schemeSet1);
  const format = d3.format(".2f");
  const data = createPie(props.data);

  return (
    <svg width={props.width} height={props.height}>
      <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
        {/* Add the text element for "Gender" */}
        <text
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="black"
          dy=".35em" // Adjust vertical alignment if needed
        >
          <tspan x="0" dy="0">
            {props.label1}
          </tspan>
          <tspan x="0" dy="1.2em">
            {props.label2 ? props.label2 : ""}
          </tspan>
        </text>
        {/* End of text element for "Gender" */}
        {data.map((d, i) => (
          <Arc
            key={i}
            index={i}
            data={d}
            createArc={createArc}
            colors={colors}
            format={format}
            showLabel={props.showLabel}
          />
        ))}
      </g>
    </svg>
  );
};

const BarChart = ({
  data,
  label,
}: {
  data: [string, number][];
  label: string;
}) => {
  // Calculate maximum value for scaling the bars
  const maxValue = Math.max(...data.map(([_, value]) => value));

  // Set dimensions for the chart
  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create scaling functions
  const xScale = d3
    .scaleBand()
    .domain(data.map(([label]) => label))
    .range([0, innerWidth])
    .padding(0.1);

  const yScale = d3.scaleLinear().domain([0, maxValue]).range([innerHeight, 0]);

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {data.map(([label, value], index) => (
            <rect
              key={index}
              x={xScale(label)!}
              y={yScale(value)}
              width={xScale.bandwidth()}
              height={innerHeight - yScale(value)}
              fill="slateblue"
            />
          ))}
          <g transform={`translate(0,${innerHeight})`}>
            <g
              className="axis"
              //@ts-ignore
              ref={(node) => d3.select(node).call(d3.axisBottom(xScale))}
            />
          </g>
          <g
            className="axis"
            //@ts-ignore
            ref={(node) => d3.select(node).call(d3.axisLeft(yScale))}
          />
        </g>
      </svg>
      <div className="text-center font-bold">{label}</div>
    </div>
  );
};
