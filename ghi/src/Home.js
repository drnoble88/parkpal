import React, { useState } from "react";
import { useGetAccountQuery } from "./store/apiSlice";
const HomePage = () => {
  const { data } = useGetAccountQuery();
  console.log(data);

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/545964/pexels-photo-545964.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <h1 className="text-center mb-5">Park Pal</h1>
      <form className="form-inline mb-3">
        <div className="row no-gutters align-items-center">
          <div className="col-md-12">
            <div className="d-flex justify-content-between">
              <input
                className="form-control border-secondary rounded-pill form-control-lg pr-5"
                type="search"
                placeholder="National Park"
                id="example-search-input2"
                style={{ width: "100%" }}
              />
              <button
                className="btn btn-outline-light text-dark border-0 rounded-pill ml-2"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src="https://www.shutterstock.com/image-photo/scenic-panoramic-view-famous-yosemite-260nw-1689107770.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">NATIONAL PARK NAME</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-success">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src="https://www.shutterstock.com/image-photo/scenic-panoramic-view-famous-yosemite-260nw-1689107770.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">NATIONAL PARK NAME</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-success">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src="https://www.shutterstock.com/image-photo/scenic-panoramic-view-famous-yosemite-260nw-1689107770.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">NATIONAL PARK NAME</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-success">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
        {/* Repeat the card component for additional cards */}
        <div className="col-md-4 mb-4">{/* Card component */}</div>
        <div className="col-md-4 mb-4">{/* Card component */}</div>
        <div className="col-md-4 mb-4">{/* Card component */}</div>
        <div className="col-md-4 mb-4">{/* Card component */}</div>
        <div className="col-md-4 mb-4">{/* Card component */}</div>
        <div className="col-md-4 mb-4">{/* Card component */}</div>
      </div>
    </div>
  );
};
export default HomePage;
