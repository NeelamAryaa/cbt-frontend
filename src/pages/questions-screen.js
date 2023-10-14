import React, { Component, Fragment } from "react";
import axios from "axios";

import QuesScreenLeftPanel from "../components/ques-screen-left-panel";
import QuesScreenRightPanel from "../components/ques-screen-right-panel";
import Toast from "../components/toast";
import "../App.css";
import { connect } from "react-redux";
import {
  SetAnswer,
  Unchecked,
  MarkForReview,
  ChangeQuestion,
  SetQuestionPaper,
  UpdateCurrentSection,
} from "../redux/question/question.actions";
import { base_api_url } from "../config";
import Spinner from "../components/spinner";
import { Toaster } from "react-hot-toast";
import { notify } from "../components/toast";

class QuestionsScreen extends Component {
  state = {
    checkedOption: -1,
    isLoading: true,
  };

  getAllquestionsCurrentPaper = async (id, pid) => {
    await axios
      .get(`${base_api_url}/api/getPaper/${this.props.match.params.id}`, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("login")).token,
        },
      })
      .then((res) => {
        this.props.UpdateCurrentSection(Object.keys(res.data)[0]);
        this.props.SetQuestionPaper(res.data);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        notify(err.response.data);
      });
  };

  handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  componentDidMount = () => {
    this.getAllquestionsCurrentPaper(
      this.props.quesPprID,
      this.props.paperTypeID
    );

    const { history } = this.props;

    window.addEventListener("beforeunload", this.handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", this.handleBeforeUnload);
    };
  };

  updateCheckedOption = (idx) => {
    this.setState({ checkedOption: idx });
  };

  onChangeQues = (idx) => {
    this.setState({ checkedOption: -1 });
    this.props.ChangeQuestion(idx);
  };

  clearResponse = (qid) => {
    this.setState({ checkedOption: -1 });
    this.props.Unchecked(qid);
  };

  render() {
    return (
      <div className="h-100 ">
        {this.state.isLoading ? (
          <>
            <nav
              className="navbar py-0 px-3 text-white"
              style={{ backgroundColor: "#29385c" }}
            >
              NIMCET - 2021
            </nav>
            <Toaster />
            <Spinner />
            {/* <h1>loader</h1> */}
          </>
        ) : Object.keys(this.props.questions).length ? (
          <div className="d-flex">
            <QuesScreenLeftPanel
              // className="w-75"
              questions={this.props.questions}
              answers={this.props.answers}
              MarkForReview={this.props.MarkForReview}
              clearResponse={this.clearResponse}
              SetAnswer={this.props.SetAnswer}
              updateCheckedOption={this.updateCheckedOption}
              checkedOption={this.state.checkedOption}
            />
            <QuesScreenRightPanel
              // className="w-25"
              questions={this.props.questions}
              currentSection={this.props.currentSection}
              onChangeQues={this.onChangeQues}
              updateCheckedOption={this.updateCheckedOption}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.index.questions,
    answers: state.index.answers,
    currentSection: state.index.currentSection,
    quesPprID: state.index.paperID,
    paperTypeID: state.index.paperTypeID,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    SetQuestionPaper: (ppr) => dispatch(SetQuestionPaper(ppr)),
    UpdateCurrentSection: (sec) => dispatch(UpdateCurrentSection(sec)),
    Unchecked: (qid) => dispatch(Unchecked(qid)),
    MarkForReview: () => dispatch(MarkForReview()),
    ChangeQuestion: (idx) => dispatch(ChangeQuestion(idx)),
    SetAnswer: (qid, idx) => dispatch(SetAnswer(qid, idx)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(QuestionsScreen);
