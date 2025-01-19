const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


main()
	.then(() => {
		console.log("connected to db");
	})
	.catch((err) => {
		console.log(err);
	});

async function main() {
	await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
	await Listing.deleteMany({});
	// Assign the same geometry data to all listings
	const geometry = {
		type: "Point",
		coordinates: [78.474522, 17.361362],
	};

	initdata.data = initdata.data.map((obj) => ({
		...obj,
		geometry,
		owner: "678c231bd298eeaf305e700a",
	}));

	await Listing.insertMany(initdata.data);
	console.log("data initialised");
};

initDB();
