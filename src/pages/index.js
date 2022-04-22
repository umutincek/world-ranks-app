import { useState } from "react";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";

export default function Home({ countryList }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountryList = countryList.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>
          Found {countryList.length} countries
        </div>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or Sub Region"
            onChange={onInputChange}
          />
        </div>
      </div>
      <CountriesTable countryList={filteredCountryList} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countryList = await res.json();

  return {
    props: {
      countryList,
    },
  };
};
