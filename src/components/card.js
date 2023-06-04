import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import {
  SetQuestionPaperID,
  SetPaperTypeID,
} from "../redux/question/question.actions";

import { base_api_url } from "../config";
import Spinner from "./spinner";

const Card = (props) => {
  const history = useHistory();

  const [allQuestionPapers, setAllQuestionPaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${base_api_url}/api/getAllPaper`)

      .then((res) => {
        setAllQuestionPaper(res.data.rows);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Somthing went wrong !!!");
      });
  }, []);

  const OnStartTest = (id, pid) => {
    props.SetQuestionPaperID(id);
    props.SetPaperTypeID(pid);
    if (localStorage.getItem("login")) {
      history.push("/instruction");
    } else {
      history.push("/auth/login");
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        allQuestionPapers.map((ppr, idx) => (
          <div
            key={idx}
            className="card w-75 mx-auto my-5 text-start shadow bg-white rounded"
          >
            <h5
              className="card-header text-white"
              style={{ background: "#8a8b8c" }}
            >
              {ppr.paper_name} - {ppr.year}
            </h5>
            <div className="card-body">
              {/* <h5 className="card-title">Your score : {ppr.total_marks}</h5> */}
              <div className="card-text w-50 d-flex justify-content-between">
                <div>Questions : {ppr.total_ques}</div>
                <div>Marks : {ppr.total_marks}</div>
                <div>Time : {ppr.total_time} mintues</div>
              </div>
              {/* <Link
                  to="/instruction"
                  onClick={
                    () => OnStartTest(ppr.qp_id, ppr.ppr_id)
                    // getAllquestionsCurrentPaper(ppr.qp_id, ppr.ppr_id)
                  }
                >
                  <div className="btn btn-primary mt-3">Start Test</div>
                </Link> */}

              <div
                className="btn btn-primary mt-3"
                onClick={() => OnStartTest(ppr.qp_id, ppr.ppr_id)}
              >
                Start Test
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

const mapDispatchToprops = (dispatch) => {
  return {
    SetQuestionPaperID: (id) => dispatch(SetQuestionPaperID(id)),
    SetPaperTypeID: (pid) => dispatch(SetPaperTypeID(pid)),
  };
};

export default connect(null, mapDispatchToprops)(Card);
