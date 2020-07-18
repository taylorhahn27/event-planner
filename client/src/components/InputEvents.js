import React, { Fragment, useState } from "react";

const InputEvents = () => {
  const [events_name, setEventName] = useState("");
  const [events_location, setEventLocation] = useState("");
  const [events_sponsor, setEventSponsor] = useState("");
  const [events_date, setEventDate] = useState("");
  const [events_message, setEventMessage] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        events_name,
        events_location,
        events_sponsor,
        events_date,
        events_message,
      };

      await fetch("http://localhost:5000/add-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      document.getElementById("event-form").reset();
      window.location = "/events";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Add Events</h1>
      <form className="mt-5" id="event-form" onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Event Name"
            value={events_name}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Event Location"
            value={events_location}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Event Sponsor"
            value={events_sponsor}
            onChange={(e) => setEventSponsor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Event Date"
            value={events_date}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Event Message"
            value={events_message}
            onChange={(e) => setEventMessage(e.target.value)}
          />
        </div>
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputEvents;
