import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function UserList() {
  const classes = useStyles();

  const [sales, setSales] = useState([]);
  useEffect(() => {
    SalesGet();
  }, []);

  const SalesGet = () => {
    fetch("http://localhost:4000/sales")
      .then((res) => res.json())
      .then((result) => {
        setSales(result);
      });
  };

  const UpdateSale = (id) => {
    window.location = "/update/" + id;
  };

  const DeleteSale = (id) => {
    fetch("http://localhost:4000/sales/delete-sale/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        SalesGet();
      });
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0px",
              }}
            >
              <Box flexGrow={1}>
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  SALES
                </Typography>
              </Box>
              <Box>
                <Link to="/create">
                  <Button variant="contained" color="primary">
                    ADD SALE
                  </Button>
                </Link>
              </Box>
            </div>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sr</TableCell>

                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales &&
                  sales.map((sale, index) => (
                    <TableRow key={sale.ID}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{sale?.name}</TableCell>
                      <TableCell align="center">
                        {moment(sale?.date).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align="center">{sale?.price}</TableCell>
                      <TableCell align="center">{sale?.quantity}</TableCell>
                      <TableCell align="center">
                        {sale.quantity * sale.price}
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup
                          color="primary"
                          aria-label="outlined primary button group"
                        >
                          <Button onClick={() => UpdateSale(sale._id)}>
                            Edit
                          </Button>
                          <Button onClick={() => DeleteSale(sale._id)}>
                            Del
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
