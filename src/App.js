import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    costGuess: '',
    spidrPin: ['', '', '', '']
  });

  // Sets of the segments for phone number input
  // 3-3-4 format: ex: (123) 456-7890
  const [phoneSegs, setPhoneSegs] = useState(['', '', '']);
  const [showPin, setShowPin] = useState(false);

  // refs for PIN and phone inputs
  const pinRefs = [useRef(), useRef(), useRef(), useRef()];
  const phoneRefs = [useRef(), useRef(), useRef()];

  // Handle changes for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
  };

  const handlePhoneChange = (index, value) => {
    // allow only digits, max length 3 for first two, 4 for last
    const maxLen = index < 2 ? 3 : 4;
    if (/^\d*$/.test(value) && value.length <= maxLen) {
      const segs = [...phoneSegs];
      segs[index] = value;
      setPhoneSegs(segs);

      // auto-advance
      if (value.length === maxLen && index < phoneRefs.length - 1) {
        phoneRefs[index + 1].current.focus();
      }
      // backspace jump
      if (value.length === 0 && index > 0) {
        phoneRefs[index - 1].current.focus();
      }
    }
  };

  // Handle changes for PIN inputs
  // Each segment is 4 digits, separated by dashes as seen in example 
  const handlePinChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 4) {
      const pin = [...formData.spidrPin];
      pin[index] = value;
      setFormData(f => ({ ...f, spidrPin: pin }));

      if (value.length === 4 && index < 3) {
        pinRefs[index + 1].current.focus();
      }
      if (value.length === 0 && index > 0) {
        pinRefs[index - 1].current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // formats pin and phone correctly for submission and console logs the data
    const phone = `(${phoneSegs[0]}) ${phoneSegs[1]}-${phoneSegs[2]}`;
    const pin = formData.spidrPin.join('-');
    console.log('Form Data:', {
      ...formData,
      phone,
      spidrPin: pin
    });
  };


  const handleCostChange = (e) => {
    let val = e.target.value;
    // Remove anything but digits and dots, there are no letters in numbers
    val = val.replace(/[^0-9.]/g, '');
    // Allow only one decimal point
    const parts = val.split('.');
    if (parts.length > 2) {
      val = parts.shift() + '.' + parts.join('');
    }
    // Limit to two decimals, prices can not have more than two 
    if (parts[1]?.length > 2) {
      parts[1] = parts[1].slice(0, 2);
      val = parts[0] + '.' + parts[1];
    }
    setFormData(f => ({ ...f, costGuess: val }));
  };


  // When they leave the field, parse & re-format in USD
  const handleCostBlur = () => {
    const rawValue = formData.costGuess.replace(/[^0-9.]/g, '');
    if (rawValue === '') {
      // user left it empty — don’t format to $0.00
      return;
    }
    const num = parseFloat(rawValue);
    const formatted = num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    setFormData(f => ({ ...f, costGuess: formatted }));
  };


  // When they re-enter the field, strip out the formatting so they can edit
  const handleCostFocus = () => {
    const raw = formData.costGuess.replace(/[^0-9.]/g, '');
    setFormData(f => ({ ...f, costGuess: raw }));
  };

  return (
    <div
      className="container"
      style={{ fontFamily: "'TikTok Sans', sans-serif", fontWeight: 300 }}
    >
      <h1 className="form-heading">Spidr Air Fryer</h1>
      <p className="form-subheading">Interest Form</p>
      <hr className="title-divider" />

      <form onSubmit={handleSubmit}>

        {/* Full Name showing first, then last name*/}
        <div className="name-inputs">
          <div className="name-field">
            <label className="field-label" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="name-field">
            <label className="field-label" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <label className="field-label">Phone Number</label>
        <div className="phone-inputs">
          {phoneSegs.map((seg, i) => (
            <React.Fragment key={i}>
              <input
                ref={phoneRefs[i]}
                type="text"
                inputMode="numeric"
                value={seg}
                onChange={e => handlePhoneChange(i, e.target.value)}
                maxLength={i < 2 ? 3 : 4}
                style={{
                  width: i < 2 ? '60px' : '80px',
                  textAlign: 'center',
                  padding: '12px',
                  border: 'none'
                }}
                required
              />
              {i < 2 && <span className="phone-dash">–</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Email Address */}
        <label className="field-label" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          title="Please enter a valid email address (e.g. name@example.com)"
        />

        {/* Cost Guess */}
        <label className="field-label" htmlFor="costGuess">
          Guess the Air Fryer's Cost (US $)
        </label>
        <input
          id="costGuess"
          type="text"
          name="costGuess"
          inputMode="decimal"
          value={formData.costGuess}
          onChange={handleCostChange}
          onBlur={handleCostBlur}
          onFocus={handleCostFocus}
          required
        />



        {/* PIN */}
        <label className="pin-label">Secret 16-digit Spidr PIN</label>
        <div className="pin-inputs">
          {formData.spidrPin.map((seg, i) => (
            <React.Fragment key={i}>
              <input
                ref={pinRefs[i]}
                type={showPin ? 'text' : 'password'}
                value={seg}
                onChange={e => handlePinChange(i, e.target.value)}
                maxLength="4"
                style={{
                  width: '60px',
                  textAlign: 'center',
                  padding: '12px',
                  border: 'none'
                }}
                required
              />
              {i < 3 && <span className="pin-dash">–</span>}
            </React.Fragment>
          ))}
        </div>
        {/* Toggle to show/hide PIN */}
        {/* Pin is said to be super secret, so this is added security*/}
        <label className="pin-toggle">
          <input
            type="checkbox"
            checked={showPin}
            onChange={() => setShowPin(s => !s)}
          /> Show PIN
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
