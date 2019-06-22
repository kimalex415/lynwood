import React from "react";
import RecommendationCard from "./RecommendationCard";
import {
  getSearch,
  recommendationPaged
} from "../../services/resourcesService";
import "./recommendations.css";
import swal from "sweetalert";
import PropTypes from "prop-types";

import {
  Row,
  Col,
  Button,
  InputGroupAddon,
  InputGroup,
  Input
} from "reactstrap";

// import logger from "../../logger";
// const _logger = logger.extend("RecommendationsList");

class RecommendationsList extends React.Component {
  state = {
    resourcesComp: [],
    pageIndex: 0,
    pageSize: 6,
    totalPages: 0,
    pageNumber: 0,
    query: "",
    hasNextPage: false,
    hasPreviousPage: false,
    phoneNum: ""
  };

  componentDidMount() {
    this.runPaginated();
  }

  onGetResourcesSuccess = resp => {
    this.setState({
      resourcesComp: resp.item.pagedItems.map(this.mapList),
      hasNextPage: resp.item.hasNextPage,
      hasPreviousPage: resp.item.hasPreviousPage,
      totalPages: resp.item.totalPages
    });
  };

  runPaginated = () => {
    const id = this.props.location.state.id;
    recommendationPaged(id, this.state.pageIndex, this.state.pageSize)
      .then(this.onGetResourcesSuccess)
      .catch(this.onGetResourcesSucces);
  };

  runSearch = (pageNumber, pageSize, query) => {
    getSearch(pageNumber, pageSize, query)
      .then(this.onGetResourcesSearchSuccess)
      .catch(this.onError);
  };

  searchQuery = () => {
    if (this.state.totalPages > this.state.pageNumber) {
      this.runSearch(
        this.state.pageNumber,
        this.state.pageSize,
        this.state.query
      );
    }
  };

  displayPhoneNum = () => {};

  mapList = (resource, index) => {
    return (
      <RecommendationCard
        resource={resource}
        key={index}
        getPhNum={this.displayPhoneNum}
      />
    );
  };

  changeHandler = e => {
    let val = e.target.value;
    this.setState({ query: val }, () => {
    });
  };

  searchClickHandler = () => {
    let pageNumber = 0;
    this.setState({ pageIndex: 0, pageNumber: 0 }, () => {
      this.runSearch(pageNumber, this.state.pageSize, this.state.query);
    });
  };

  onGetResourcesSearchSuccess = resp => {
    this.setState({
      resourcesComp: resp.item.pagedItems.map(this.mapList),
      hasNextPage: resp.item.hasNextPage,
      hasPreviousPage: resp.item.hasPreviousPage,
      totalPages: resp.item.totalPages
    });
  };

  keyPress = e => {
    let pageNumber = 0;
    if (e.keyCode === 13) {
      this.runSearch(pageNumber, this.state.pageSize, this.state.query);
    }
  };

  clearSearchHandler = () => {
    this.setState({ query: "", pageIndex: 0, pageNumber: 0 }, () => {
      this.runPaginated();
    });
  };

  nextClick = () => {
    if (this.state.hasNextPage) {
      this.setState(
        () => {
          return { pageIndex: this.state.pageIndex + 1 };
        },
        () => {
          if (this.state.query) {
            this.setState(
              { pageNumber: this.state.pageNumber + 1 },
              this.searchQuery
            );
          } else {
            this.runPaginated();
          }
        }
      );
    }
  };

  prevClick = () => {
    if (this.state.hasPreviousPage) {
      this.setState({ pageIndex: this.state.pageIndex - 1 }, () => {
        if (this.state.query) {
          this.setState({ pageNumber: this.state.pageNumber - 1 }, () => {
            if (this.state.pageNumber >= 0) {
              this.runSearch(
                this.state.pageNumber,
                this.state.pageSize,
                this.state.query
              );
            }
          });
        } else {
          this.runPaginated();
        }
      });
    }
  };

  onError = () => {
    swal({
      title: "Ooops! There seems to be an error on our side!",
      icon: "warning"
    });
  };

  toRegister = event => {
    if (event.currentTarget.id === "resource") {
      this.props.history.push("/register", { userTypeId: 4 });
    } else if (event.currentTarget.id === "business") {
      this.props.history.push("/register", { userTypeId: 3 });
    } else {
      this.props.history.push("/register", { userTypeId: 2 });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="resource">
          <div className="container recommendations-card">
            <div className="row">
              <div className="col-md-10 ml-auto mr-auto">
                <Row>
                  <InputGroup className="mt-4">
                    <Input
                      bsSize="lg"
                      placeholder="Search by Company Name, Description, Business Type, or Resource Type"
                      onChange={this.changeHandler}
                      name="query"
                      onKeyDown={this.keyPress}
                      value={this.state.query}
                    />
                    <InputGroupAddon addonType="append">
                      <Button
                        outline
                        color="secondary"
                        onClick={this.searchClickHandler}
                      >
                        <em className="fas fa-search" />
                      </Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                      <Button
                        outline
                        color="secondary"
                        onClick={this.clearSearchHandler}
                      >
                        <em className="fas fa-undo-alt" />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Row>

                <h2 className="title recommendation-title">Recommendations</h2>
                <div className="text-right" />

                <br />
                {this.state.resourcesComp}
              </div>
            </div>
            <div className="row justify-content-center">
              <h2 className="recommendations-title">Register</h2>
            </div>
            <div className="row recommendations-signUp">
              <div
                className="col-md-4 text-center pointer"
                onClick={this.toRegister}
                id="business"
              >
                <div className="info">
                  <div className="icon">
                    <span className="fa-stack fa-2x">
                      <em className="fa fa-circle fa-stack-2x text-info" />
                      <em className="fas fa-piggy-bank fa-stack-1x fa-inverse text-white" />
                    </span>
                  </div>
                  <h4 className="info-title my-2">Business</h4>
                  <p>
                    Registering your business is a key part of getting up and
                    running. All companies doing business in the City of Lynwood
                    need to register with the City.
                  </p>
                </div>
              </div>
              <div
                className="col-md-4 text-center pointer"
                onClick={this.toRegister}
                id="resource"
              >
                <div className="info">
                  <div className="icon">
                    <span className="fa-stack fa-2x">
                      <em className="fa fa-circle fa-stack-2x text-success" />
                      <em className="fas fa-hand-holding-usd fa-stack-1x fa-inverse text-white" />
                    </span>
                  </div>
                  <h4 className="info-title my-2">Resource</h4>
                  <p>
                    Resources, or assets, can include individuals, organizations
                    and institutions, buildings, landscapes, equipment --
                    anything that can be used to improve the quality of life.
                  </p>
                </div>
              </div>
              <div
                className="col-md-4 text-center pointer"
                onClick={this.toRegister}
                id="entrepreneur"
              >
                <div className="info">
                  <div className="icon">
                    <span className="fa-stack fa-2x">
                      <em className="fa fa-circle fa-stack-2x text-danger" />
                      <em className="fas fa-lightbulb fa-stack-1x fa-inverse text-white" />
                    </span>
                  </div>
                  <h4 className="info-title my-2">Entrepreneur</h4>
                  <p>
                    Entrepreneurship is a broad term, and you can be an
                    entrepreneur in just about any area. However, you will have
                    to pick a field to work in and business to start.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container button-margin">
            <Row>
              <Col className="prevButton" xs="3">
                <Button
                  className="button4 list-card button-round"
                  size="lg"
                  block
                  onClick={this.prevClick}
                >
                  Previous
                </Button>
              </Col>
              <Col xs="6" />
              <Col className="nextButton" xs="3">
                <Button
                  className="button4 list-card button-round"
                  size="lg"
                  block
                  onClick={this.nextClick}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

RecommendationsList.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};

export default RecommendationsList;
