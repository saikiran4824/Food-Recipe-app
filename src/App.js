import React from "react";
import Header from "./components/header";
import Footer from "./components/Footer";
import Main from "./components/mainBody";

export default function App() {
  return (
    <div className=" flex flex-col items-center">
			<Header />
			<Main/>
			<Footer/>
    </div>
  );
}
