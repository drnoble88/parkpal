import React, { useEffect } from "react";
import { useGetOneParkQuery } from "./store/apiSlice";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useGetAccountQuery } from "./store/apiSlice";
import { imageStyle1, cardTitleStyle, arrowIconStyle1, containerStyle1, whiteBackgroundStyle1, lineStyle } from "./styling";

const ParkDetails = () => {
  const { parkCode } = useParams();
  const { data, isLoading, isError, refetch } = useGetOneParkQuery(parkCode);
  const { data: account } = useGetAccountQuery();


  useEffect(() => {
    refetch();
  }, [parkCode, refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching park details</div>;
  }
  let act = data.activities.join(" - ");

  return (
    <div style={containerStyle1}>
      <div style={whiteBackgroundStyle1} className="container justify-content-center">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 style={cardTitleStyle}>{data.fullName}</h1>
            <p>{data.description}</p>
            <h1 style={cardTitleStyle}>Activities</h1>
            <p className="text-center">{act}</p>
            <hr style={lineStyle} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Carousel
              nextIcon={<span className="carousel-control-next-icon" style={arrowIconStyle1} />}
              prevIcon={<span className="carousel-control-prev-icon" style={arrowIconStyle1} />}
            >
              {data?.images.map((image, index) => (
                <Carousel.Item key={index} style={{height: "600px"}}>
                  <img
                    src={image}
                    alt=""
                    className="d-block mx-auto rounded"
                    style={imageStyle1}

                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <hr style={lineStyle} />
          </div>
          {account &&
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Link
              to={`/specific/${data.parkCode}`}
              className="btn btn-dark mt-2"
            >
              Create a trip for {data.fullName}
            </Link>
          </div>
              }
          <div className="col-md-12 text-center">
            <h1 style={cardTitleStyle}>Contact Information</h1>
            <p>
              Phone: {data.phoneNumber} | Email: {data.emailAddresses} | Address: {data.addresses.line1}, {data.addresses.city}, {data.addresses.stateCode} {data.addresses.postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkDetails;
