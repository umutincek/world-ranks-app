import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";
import Link from "next/Link";
import { Pagination } from "@mui/material";

const orderBy = (countryList, value, direction) => {
  if (direction === "asc") {
    return [...countryList].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countryList].sort((a, b) => (a[value] < b[value] ? 1 : -1));
  }

  return countryList;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countryList, pageNumber, setPageNumber }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const perPage = 5;
  const pageCount = Math.ceil(countryList.length / 10);

  const orderedCountries = orderBy(countryList, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (val) => {
    switchDirection();
    setValue(val);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries
        .slice((pageNumber - 1) * perPage, (pageNumber - 1) * perPage + perPage)
        .map((country) => (
          <Link href={`/country/${country.alpha3Code}`} key={country.name}>
            <div className={styles.row}>
              <div className={styles.flag}>
                <img src={country.flag} alt={country.name} />
              </div>
              <div className={styles.name}>{country.name}</div>
              <div className={styles.population}>{country.population}</div>
              <div className={styles.area}>{country.area || 0}</div>
            </div>
          </Link>
        ))}
      <div className={styles.pagination}>
        <Pagination
          count={pageCount}
          page={pageNumber}
          variant="outlined"
          shape="rounded"
          size="large"
          color="primary"
          showFirstButton={true}
          showLastButton={true}
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "4px",
          }}
          onChange={(e, page) => setPageNumber(page)}
        />
      </div>
    </div>
  );
};

export default CountriesTable;
