import React from "react";

const NotFoundComponent = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <h1 style={styles.heading}>Page Not Found</h1>
      <p style={styles.paragraph}>
        We're sorry, but the page you were looking for doesn't exist.
      </p>
      <a href="/" style={styles.link}>
        Go to Home
      </a>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
  heading: {
    fontSize: "2em",
    margin: "20px 0",
  },
  paragraph: {
    fontSize: "1.2em",
    margin: "20px 0",
  },
  link: {
    fontSize: "1.2em",
    color: "#007bff",
    textDecoration: "none",
  },
};

export default NotFoundComponent;
