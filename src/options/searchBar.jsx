import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { useNavigate } from "react-router";
import { useSearchParams, createSearchParams } from "react-router-dom";
export default function SearchBar() {
  const [checkBuyValue, setCheckBuyValue] = useState("");
  const [checkRentValue, setCheckRentValue] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  function handleChangeBuy(e) {
    const buyCheck = e.target.checked;
    console.log("Buy check: ", buyCheck);
    if (buyCheck) {
      return setCheckBuyValue("buy");
    } else {
      setCheckBuyValue("");
    }
  }
  console.log(checkBuyValue);
  function handleChangeRent(e) {
    const rentCheck = e.target.checked;
    console.log("Rent check: ", rentCheck);

    if (rentCheck) {
      return setCheckRentValue("rent");
    } else {
      setCheckRentValue("");
    }
  }

  console.log(checkRentValue);

  const navigateSearch = useNavigateSearch();
  function handleSubmit(e) {
    e.preventDefault();
    let searchInput = e.target.searchBar.value;
    let inputSearch = "";
    if (searchInput) {
      inputSearch = searchInput;
    } else {
      inputSearch = "";
    }

    navigateSearch("/properties", {
      deal: checkBuyValue || checkRentValue,
      input: inputSearch,
    });
  }

  return (
    <>
      <form id="searchBar" onSubmit={handleSubmit}>
        <div className="searchBar-first-part">
          <div className="check-box">
            <input
              type="checkbox"
              name="BuyingCheck"
              id="BuyingCheck"
              onChange={handleChangeBuy}
            />
            <label htmlFor="BuyingCheck">Buy</label>
          </div>
          <div className="check-box">
            <input
              type="checkbox"
              name="RentingCheck"
              id="RentingCheck"
              onChange={handleChangeRent}
            />
            <label htmlFor="RentingCheck">Rent</label>
          </div>
        </div>
        <div className="searchBar-second-part">
          <input type="text" placeholder="Search" name="searchBar" id="" />
          <button type="submit">
            <ImSearch size={28} id="search-icon" />
          </button>
        </div>
      </form>
    </>
  );
}
export const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname, params) =>
    navigate({ pathname, search: `?${createSearchParams(params)}` });
};
