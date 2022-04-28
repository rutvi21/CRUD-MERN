import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useParams } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserUpdate() {
  const navigate = useNavigate();
  const classes = useStyles();

  const { id } = useParams();
  useEffect(() => {
    fetch("http://localhost:4000/sales/update-sale/" + id)
      .then((res) => res.json())
      .then((result) => {
        setName(result.name);
        setDate(result.date);
        setQuantity(result.quantity);
        setPrice(result.price);
        // console.log(moment(result.date).format("MM/dd/yyyy"));
      });
  }, [id]);
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      name: name,
      date: date,
      quantity: quantity,
      price: price,
    };
    fetch("http://localhost:4000/sales/update-sale/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/");
        // if (result["status"] === "ok") {
        //   navigate("/");
        //   alert(result["message"]);
        // }
      });
  };

  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Update Sale
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  inputVariant="outlined"
                  required
                  fullWidth
                  label="Date"
                  value={date}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>

              {/* </MuiPickersUtilsProvider> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="quantity"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
    </Container>
  );
}
