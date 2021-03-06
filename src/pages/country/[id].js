import styles from "./Country.module.css";
import Layout from "../../components/Layout/Layout";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);

  const country = await res.json();

  return country;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBorders = async () => {
    setIsLoading(true);
    if (country.borders) {
      const borders = await Promise.all(
        country.borders?.map((border) => getCountry(border))
      );

      setBorders(borders);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.container_left}>
            <div className={styles.overview_panel}>
              <img src={country.flag} alt={country.name} />
              <h1 className={styles.overview_name}>{country.name}</h1>
              <div className={styles.overview_region}>{country.region}</div>
              <div className={styles.overview_numbers}>
                <div className={styles.overview_population}>
                  <div className={styles.overview_value}>
                    {country.population}
                  </div>
                  <div className={styles.overview_label}>Population</div>
                </div>
                <div className={styles.overview_area}>
                  <div className={styles.overview_value}>{country.area}</div>
                  <div className={styles.overview_label}>Area</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container_right}>
            <div className={styles.details_panel}>
              <h4 className={styles.details_panel_heading}>Details</h4>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Capital</div>
                <div className={styles.details_panel_value}>
                  {country.capital}
                </div>
              </div>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Language</div>
                <div className={styles.details_panel_value}>
                  {country.languages.map(({ name }) => name).join(", ")}
                </div>
              </div>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Currencies</div>
                <div className={styles.details_panel_value}>
                  {country.currencies.map(({ name }) => name).join(", ")}
                </div>
              </div>
              <div className={styles.details_panel_row}>
                <div className={styles.details_panel_label}>Native name</div>
                <div className={styles.details_panel_value}>
                  {country.nativeName}
                </div>
              </div>

              <div className={styles.details_panel_borders}>
                <div className={styles.details_panel_borders_label}>
                  Neighbouring Countries
                </div>

                <div className={styles.details_panel_borders_container}>
                  {borders.map(({ flag, name, alpha3Code }) => (
                    <div
                      className={styles.details_panel_borders_country}
                      key={alpha3Code}
                    >
                      <img src={flag} alt={name} />
                      <div className={styles.details_panel_borders_name}>
                        {name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
