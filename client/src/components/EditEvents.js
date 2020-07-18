import React, { Fragment, useState } from "react";
import moment from "moment";

//TO DO:
//editing text within edit event form is not working

const EditEvents = ({ event }) => {
  const [eventsData, setEvents] = useState(event);

  const updateEvent = async (e) => {
    e.preventDefault();

    try {
      const body = { eventsData };
      await fetch(`http://localhost:5000/events/${event.events_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${event.events_id}`}
      >
        Edit
      </button>

      <div
        className="modal"
        id={`id${event.events_id}`}
        onClick={() => setEvents(event.eventsData)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Event</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setEvents(event.eventsData)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={event.events_name}
                  onChange={(e) => setEvents(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={event.events_location}
                  onChange={(e) => setEvents(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={event.events_sponsor}
                  onChange={(e) => setEvents(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={moment(event.events_date).format("L")}
                  onChange={(e) => setEvents(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={event.events_message}
                  onChange={(e) => setEvents(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={(e) => updateEvent(e)}
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setEvents(event.eventsData)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditEvents;
