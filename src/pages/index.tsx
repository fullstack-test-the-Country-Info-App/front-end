import SEO from "@/components/SEO/SEO";
import {
  Box,
  Heading,
  Text,
  Spinner,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";

interface CitiesPageProps {
  cities:
    | {
        countryCode: string;
        name: string;
      }[]
    | null;
  error: string | null;
}

const CitiesPage = ({ cities, error }: CitiesPageProps) => {
  const router = useRouter();

  if (error) {
    return (
      <Box p={8} textAlign="center">
        <Heading mb={4} color="red.500">
          Oops! Something went wrong
        </Heading>
        <Text>{error}</Text>
      </Box>
    );
  }

  if (!cities) {
    return (
      <Box p={8} textAlign="center">
        <Heading mb={4}>Loading Cities</Heading>
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <>
      <SEO title="Cities" />
      <Box p={8} textAlign="center">
        <Heading mb={6} fontSize="3xl" color="teal.500">
          Available Cities
        </Heading>
        <VStack align="center">
          {cities.map((city, index) => (
            <HStack
              key={index}
              p={4}
              w="100%"
              maxW="400px"
              borderRadius="md"
              shadow="md"
              _hover={{ bg: "teal.800", cursor: "pointer" }}
              onClick={() => router.push(`/country/${city.countryCode}`)}
              justifyContent={"space-between"}
            >
              <Text fontSize="lg" fontWeight="bold">
                {city.name}
              </Text>
              <Button
                size="sm"
                backgroundColor="transparent"
                onClick={() => router.push(`/country/${city.countryCode}`)}
                color={"teal.500"}
              >
                <FaArrowRight />
              </Button>
            </HStack>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_DOMAIN}/getAvailableCountries`);
    const data = await response.json();

    if (data) {
      return {
        props: {
          cities: data,
          error: null,
        },
      };
    } else {
      return {
        props: {
          cities: null,
          error: "No cities found.",
        },
      };
    }
  } catch (error) {
    return {
      props: {
        cities: null,
        error: error || "Failed to load cities.",
      },
    };
  }
};

export default CitiesPage;
