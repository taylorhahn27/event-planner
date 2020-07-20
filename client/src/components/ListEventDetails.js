import React, { Fragment, useState, useEffect } from "react";

const ListEventDetails = () => {
  const [contactsData, setContactsData] = useState([]);
  const [eventsDetails, setEvents] = useState([]);

  const getDetails = async () => {
    try {
      const eventResponse = await fetch(`http://localhost:5000/events/7`);
      const contactResponse = await fetch("http://localhost:5000/contacts");

      const eventJson = await eventResponse.json();
      const contactJson = await contactResponse.json();

      const contactData = contactJson.filter((eventName) => {
        return eventName.contacts_events[0].includes(eventJson.events_name);
      });

      setContactsData(contactData);
      setEvents(eventJson);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <Fragment>
      <h1 className="text-center mt-5">{eventsDetails.events_name}</h1>
      <h4 className="text-center mt-5">{eventsDetails.events_message}</h4>
      <table className="table table-striped table-hover mt-5 text-center">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {contactsData.map((contact) => (
            <tr key={contact.contacts_id}>
              <td>{contact.contacts_first_name}</td>
              <td>{contact.contacts_last_name}</td>
              <td>{contact.contacts_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListEventDetails;
