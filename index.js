import express from "express";
const app = express();
const PORT = 4000;
app.use(express.json());
//initlaizing the data
const hallData = [
  {
    id: "1",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "Sanjay",
    date: "05-feb-2022",
    startTime: "10-feb-2022 at 12PM",
    endTime: "11-feb-2020 at 11am",
    RoomId: 201,
    RoomName: "Duplex",
  },
  {
    id: "2",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 202,
    RoomName: "Duplex",
  },
  {
    id: "3",
    numberOfSeats: 50,
    amenities: ["Ac", "chairs"],
    price: 3000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 203,
    RoomName: "Classic",
  },
  {
    id: "4",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights"],
    price: 5000,
    ifBooked: "true",
    customerName: "Suresh",
    date: "03-feb-2022",
    startTime: "15-feb-2022 at 12PM",
    endTime: "16-feb-2020 at 11am",
    RoomId: 204,
    RoomName: "Duplex",
  },
  {
    id: "5",
    numberOfSeats: 200,
    amenities: ["Ac", "chairs", "discolights", "buffet"],
    price: 9000,
    ifBooked: "true",
    customerName: "Vidhya",
    date: "06-feb-2022",
    startTime: "11-feb-2022 at 12PM",
    endTime: "12-feb-2020 at 11am",
    RoomId: 205,
    RoomName: "Suite",
  },


  {
    id: "6",
    numberOfSeats: 100,
    amenities: ["Ac", "chairs", "discolights", "buffet"],
    price: 7000,
    ifBooked: "true",
    customerName: "aji",
    date: "05-feb-2022",
    startTime: "13-feb-2022 at 12PM",
    endTime: "14-feb-2020 at 11am",
    RoomId: 206,
    RoomName: "dupleix",
  },
  {
    id: "7",
    numberOfSeats: 200,
    amenities: ["Ac", "chairs", "discolights", "buffet"],
    price: 9000,
    ifBooked: "false",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
    RoomId: 207,
    RoomName: "lotus",
  },
  {
    id: "5",
    numberOfSeats: 200,
    amenities: ["Ac", "chairs", "discolights"],
    price: 2000,
    ifBooked: "true",
    customerName: "arun",
    date: "12-feb-2022",
    startTime: "21-feb-2022 at 12PM",
    endTime: "22-feb-2020 at 11am",
    RoomId: 208,
    RoomName: "lotus",
  },
];

//get request logic and method

app.get("/hall-details", (request, response) => {
  //to check the details of the booked rooms logic using request.query 
  const { ifBooked, numberOfSeats } = request.query;
  console.log(request.query, ifBooked);
  console.log(request.query, numberOfSeats);
  let filteredHall = hallData;
  if (ifBooked) {
    filteredHall = filteredHall.filter((halls) => halls.ifBooked === ifBooked);
  }
  if (numberOfSeats) {
    filteredHall = filteredHall.filter(
      (halls) => halls.numberOfSeats >= +numberOfSeats
    );
  }
  response.send(filteredHall);
});

//getting specific id

app.get("/hall-details/:id", (request, response) => {
  //to get the details of the specif room using params
  const { id } = request.params;
  console.group(id);
  //
  //   const halls = hallData.filter((hall)=>hall.id === id)[0];
  const halls = hallData.find((hall) => hall.id === id);
  response.send(halls);
});

//posting a new hall

app.post("/hall-details", (req, res) => {
  const newHall = {
    id: hallData.length + 1,
    numberOfSeats: req.body.numberOfSeats,
    amenities: req.body.amenities,
    price: req.body.price,
    RoomId: req.body.RoomId,
  };
  hallData.push(newHall);
  res.send(newHall);
});

//updating a new hall which is not booked 
app.put("/hall-details/:id", (req, res) => {
  const { id } = req.params;
  const halls = hallData.find((hall) => hall.id === id);
  //logic for not updating an already booked room.
  if (halls.ifBooked === "true") {
    res.status(400).send("Hey this room is already booked");
    return;
  } else halls.customerName = req.body.customerName;
  halls.date = req.body.date;
  halls.startTime = req.body.startTime;
  halls.endTime = req.body.endTime;
  res.send(halls);
});

//delivering the Port address. 

app.listen(PORT, () =>
  console.log(`Server started on port: localhost:${PORT}/hall-details`, PORT)
);