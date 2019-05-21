import React, { Component } from 'react';
import uuid from 'uuid';
import VenueItem from './../components/VenueItem';
import { connect } from 'react-redux';
import * as actions from './../store/actions/index';
import { updateObject } from '../shared/utilities';

import {
    Container,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    CardGroup
} from 'reactstrap';

/* Inline Styles */
const colStyle = {
    margin: '0',
    padding: '0'
};

class AddNewVenues extends Component {

    state = {
        selectedVenue: false,
        selectedVenue: {
            name: null,
            location: null,
            rating: null,
            price: null
        },
        searchData: {
            location: "",
            term: ""
        },
        venues: [
            {
                name: "Coffee Brew House",
                image: "",
                link: "",
                location: "Kaimuki, HI 96816",
                rating: 4,
                price: "$$"
            },
            {
                name: "Mama's Bar",
                image: "",
                link: "",
                location: "Honolulu, HI 88888",
                rating: 5,
                price: "$"
            },
            {
                name: "Teapresso",
                image: "",
                link: "",
                location: "Piikoi, HI 96816",
                rating: 3,
                price: "$$"
            },
            {
                name: "Teapresso2",
                image: "",
                link: "",
                location: "Piikoi, HI 96816",
                rating: 4,
                price: "$"
            }
        ]
    }

    // componentDidMount() {
    //     this.props.getYelpVenues()
    // }

    componentDidUpdate() {

    }

    onChangeSearchParams() {

    }

    onHandlerChangeLocation(event) {
        const updatedSearchData = updateObject(this.state.searchData, {
            location: event.target.value
        });
        this.setState({ searchData: updatedSearchData });
    }

    onHanderChangeTerm(event) {
        const updatedSearchData = updateObject(this.state.searchData, {
            term: event.target.value
        });
        this.setState({ searchData: updatedSearchData });
    }

    onHandleSubmitSearch() {
        this.props.loadYelpVenues(this.state.searchData);
    }

    render() {

        const venues = this.props.yelpVenues;



        return (
            <Container>
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="locations" className="mr-sm-2">Location</Label>
                        <Input
                            type="text"
                            name="location"
                            id="venueLocation"
                            value={this.state.searchData.location}
                            onChange={(event) => this.onHandlerChangeLocation(event)}
                            placeholder="city, state" />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="term" className="mr-sm-2">Terms</Label>
                        <Input
                            type="text"
                            name="term"
                            id="venueTerms"
                            value={this.state.searchData.term}
                            onChange={(event) => this.onHanderChangeTerm(event)}
                            placeholder="Coffee, Cocktails, Ramen" />
                    </FormGroup>
                    <Button color='danger' onClick={() => this.onHandleSubmitSearch()}>Submit</Button>
                </Form>

                Display yelp events
                submit button add to event venue list

                <CardGroup>
                    <Row>
                        {venues.map((venue) => (
                            <Col sm="4" style={colStyle}>
                                <VenueItem
                                    name={venue.name}
                                    image={venue.image}
                                    link={venue.link}
                                    location={venue.location}
                                    rating={venue.rating}
                                    price={venue.price}
                                    selectVenue={this.props.onSelectVenue}
                                    id={uuid}
                                    clicked={this.selectVenue}
                                />
                            </Col>

                        ))}
                    </Row>

                </CardGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    yelpVenues: state.yelpVenues.venues,
    eventVenues: state.event.venues
});

const mapDispatchToProps = dispatch => {
    return {
        loadYelpVenues: (searchParams) => dispatch(actions.loadYelpVenues(searchParams)),
        getYelpVenues: () => dispatch(actions.getYelpVenues()),
        onSelectVenue: (venueInfo) => dispatch(actions.setSelectedVenue(venueInfo))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewVenues);