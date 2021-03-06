import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import UserService from "../service/UserService";
import Utils from "../service/Utils";

export default class AddNewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstname: "",
      secondName: "",
      email: "",
      name_filled: "outlined",
      secondName_filled: "outlined",
      email_filled: "outlined",
      emailError: ""
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseAndSaveUser = this.handleCloseAndSaveUser.bind(this);
  }

  handleClickOpen = (event) => {
    this.setState({
      open: true,
      firstname: "",
      secondName: "",
      email: "",
    });
    console.log("opened");
  };
  handleClose = (event) => {
    this.setState({ open: false });
    console.log("closed");
  };

  handleCloseAndSaveUser = (event) => {
    console.log(
      "User: [firstName: " +
        this.state.firstname +
        ", secondName: " +
        this.state.secondName +
        ", email: " +
        this.state.email +
        "]"
    );
    if (
      Utils.isValueNotEmpty(this.state.firstname) &&
      Utils.isValueNotEmpty(this.state.secondName) &&
      Utils.isNotEmptyEmail(this.state.email)
    ) {
      this.setState({ open: false });
      console.log("close and save user");

      event.preventDefault();
      console.log(this.state);

      UserService.createNewUser({
        id: this.generateId(),
        firstName: this.state.firstname,
        lastName: this.state.secondName,
        email: this.state.email,
      })
        .then((response) => {
          console.log(response);
          this.refreshPage();
        })
        .catch((error) => {
          console(error);
        });
    } else {
      this.setState({
        open: true,
        firstName: this.state.firstname,
        lastName: this.state.secondName,
        email: this.state.email,
        name_filled: Utils.isValueNotEmpty(this.state.firstname) ? "outlined" : "filled",
        secondName_filled: Utils.isValueNotEmpty(this.state.secondName) ? "outlined" : "filled",
        
        email_filled: Utils.isValueNotEmpty(this.state.email)  ? "outlined"  : "filled",
        emailError: Utils.isNotEmptyEmail(this.state.email)  ?  "":  "Enter a valid email"
      });
      console.log("do not close dialog beause empty field(s)");
    }
  };

  getFirstName = (event) => {
    this.setState({ firstname: event.target.value,
      name_filled: "outlined",
    });
  };
  getSecondName = (event) => {
    this.setState({ secondName: event.target.value,
    
      secondName_filled:  "outlined",
    });
  };
  getEmail = (event) => {
    this.setState({ email: event.target.value,
      email_filled:  "outlined",
      emailError: "" 
    });
  };

  refreshPage() {
    window.location.reload(false);
  }

  generateId() {
    var date = new Date();
    var components = [
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ];

    return components.join("");
  }

  render() {
    return (
      <div className="text-left">
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          + new user
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Add new User</DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              type="text"
              //   onChange={(event) => setFirstName(event.target.value)}
              onChange={this.getFirstName}
              variant={this.state.name_filled}
            />
            <br />
            <TextField
              autoFocus
              margin="dense"
              label="Second Name"
              type="text"
              //    onChange={(event) => setSecondName(event.target.value)}
              onChange={this.getSecondName}
              variant={this.state.secondName_filled}
            />
            <br />
            <TextField
              id="componentEmail"
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              onChange={this.getEmail}
              variant={this.state.email_filled}
            /><br/>
                    <span style={{ 
          fontWeight: 'bold', 
          color: 'red', 
        }}>{this.state.emailError}</span> 
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseAndSaveUser} color="primary">
              Add User
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
