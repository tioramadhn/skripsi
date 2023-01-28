require("dotenv").config();
const express = require("express");
const axios = require("axios");
const supabaseAdmin = require("./db");
const app = express();
const port = 3000;
const jam = 3;
const satuan = 3600000;
const urlSiPongi =
  "https://sipongi.menlhk.go.id/api/opsroom/indoHotspot?wilayah=IN&filterperiode=false&late=12&satelit[]=NASA-MODIS&satelit[]=NASA-SNPP&satelit[]=NASA-NOAA20&confidence[]=high&confidence[]=medium&confidence[]=low";

const getHotspot = async () => {
  try {
    const res = await axios.get(urlSiPongi);
    const data = res.data.features.map((v, i) => v.properties);
    console.log(data);
    console.log("---------END--------");
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const addData = async (data) => {
  try {
    const res = await supabaseAdmin.from("hotspot_raw_record").insert(data);
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  // Server akan fetchin data setiap 3 jam sekali
  setInterval(async () => {
    const hotspot = await getHotspot();
    if (hotspot.length != 0) {
      addData(hotspot);
    } else {
      console.log("Data hotspot kosong");
    }
  }, 10000);

  console.log(
    `Service in ${process.env.NODE_ENV} mode, Running on port ${port}`
  );
});
