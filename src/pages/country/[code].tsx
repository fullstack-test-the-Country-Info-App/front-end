import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SEO from "@/components/SEO/SEO";
import { useRouter } from "next/router";
import { FaArrowLeft } from "react-icons/fa";

interface ICountryCodePage {
  country: string;
  borders: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
    borders: unknown;
  }[];
  populationData: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: {
      year: number;
      value: number;
    }[];
  };
  flagUrl: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CitiesCode = ({
  country,
  borders,
  populationData,
  flagUrl,
}: ICountryCodePage) => {
  const router = useRouter();

  if (!country || !borders || !flagUrl || !populationData) {
    return (
      <Box p={6} textAlign="center">
        <Heading color="red.500">Country not found</Heading>
      </Box>
    );
  }

  const populationYears = populationData.populationCounts.map(
    (pop) => pop.year
  );
  const populationValues = populationData.populationCounts.map(
    (pop) => pop.value
  );

  const chartData = {
    labels: populationYears,
    datasets: [
      {
        label: "Population",
        data: populationValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Population Over the Years",
      },
    },
  };

  return (
    <>
      <SEO title="Cities" />

      <Button
        size="sm"
        backgroundColor="transparent"
        onClick={() => router.push("/")}
        color={"teal.500"}
      >
        <FaArrowLeft />
      </Button>
      <VStack p={6} align="center" maxW="container.md">
        <Box textAlign="center">
          <Heading mb={4}>{country}</Heading>
          <Image
            src={flagUrl}
            alt={`${country} flag`}
            width={300}
            height={200}
            style={{ borderRadius: "8px" }}
          />
        </Box>

        <Box w="100%" maxW="600px">
          <Heading size="md" mb={4} textAlign="center">
            Border Countries
          </Heading>
          <VStack align="center">
            {borders.map((border, index) => (
              <Box key={index} p={3} w="100%" textAlign="center">
                <Text>{border.commonName}</Text>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box w="100%" maxW="600px">
          <Heading size="md" mb={4} textAlign="center">
            Population Data
          </Heading>
          {populationData && populationData.populationCounts.length > 0 ? (
            <VStack align="center" w="100%">
              <Text fontWeight="bold">{populationData.country}</Text>
              <Text>Code: {populationData.code}</Text>
              <Text>ISO3: {populationData.iso3}</Text>

              <Box w="100%">
                <Line data={chartData} options={chartOptions} />
              </Box>
            </VStack>
          ) : (
            <Text>No population data available</Text>
          )}
        </Box>
      </VStack>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL;

  const { code } = params as { code: string };
  try {
    const response = await fetch(`${API_DOMAIN}/countryInfo/${code}`);

    if (!response.ok) {
      return {
        notFound: true,
      };
    }

    const data = await response.json();
    return {
      props: {
        country: data.country || null,
        borders: data.borders || [],
        populationData: data.populationData || null,
        flagUrl: data.flagUrl || "",
      },
    };
  } catch (error) {
    console.error("Failed to fetch country data:", error);
    return {
      props: {
        country: null,
        borders: [],
        populationData: null,
        flagUrl: "",
      },
    };
  }
};

export default CitiesCode;
