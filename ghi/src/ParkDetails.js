import React, { useEffect } from "react";
import { useGetOneParkQuery } from "./store/apiSlice";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


const ParkDetails = () => {
  const { parkCode } = useParams();
  const { data, isLoading, isError, refetch } = useGetOneParkQuery(parkCode);

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

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "600px",
    objectFit: "contain",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const arrowIconStyle = {
    filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(176deg) brightness(109%) contrast(101%)",
  };

  const containerStyle = {
    backgroundImage: `url('https://4kwallpapers.com/images/wallpapers/moraine-lake-banff-national-park-mountains-daytime-scenery-3840x2160-2923.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

    const whiteBackgroundStyle = {
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.5)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "10px",
  };


  return (
    <div style={containerStyle}>
    <div style={whiteBackgroundStyle} className="container justify-content-center">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1>{data.fullName}</h1>
          <p>{data.description}</p>
          <h3>Activities</h3>
          <p className="text-center">{act}</p> 
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Carousel
            nextIcon={<span className="carousel-control-next-icon" style={arrowIconStyle} />}
            prevIcon={<span className="carousel-control-prev-icon" style={arrowIconStyle} />}
          >
            {data?.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  className="d-block w-100"
                  alt="Park Image"
                  style={imageStyle}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-md-12 text-center">
          <h3>Contact Information</h3>
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











