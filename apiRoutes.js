function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
}

module.exports = function (app) {

    const orm = require("./models/orm.js");

    app.post('/create', (req, res) => {
        const mlsNumber = req.query.mls_number;
        if (!mlsNumber) {
          res.status(400).json('provide a valid mls_number');
        }
        if (!req.query.address) {
          res.status(400).json('provide a valid address');
        }
        if (!req.query.city) {
          res.status(400).json('provide a valid city');
        }
        if (!req.query.state) {
          res.status(400).json('provide a valid state');
        }
        if (!req.query.country) {
          res.status(400).json('provide a valid country');
        }
        if (!req.query.zip) {
          res.status(400).json('provide a valid zip code');
        }
        if (!req.query.list_date || !isValidDate(req.query.list_date)) {
          res.status(400).json('provide a valid list_date YYYY-MM-DD');
        }
        if (!req.query.price || isNaN(req.query.price)) {
          res.status(400).json('provide a valid price');
        }
        if (!req.query.agent_id) {
          res.status(400).json('provide a valid agent_id');
        }
      
        orm.get(mlsNumber)
        .then((data) => { 
          if (data.length > 0) {
            return res.status(400).json(`${mlsNumber} already exists`);
          }
          
          orm.createListing(
            mlsNumber,
            req.query.address,
            req.query.city,
            req.query.state,
            req.query.zip,
            req.query.country,
            req.query.list_date,
            req.query.price,
            req.query.agent_id
          )
          .then((data) => { return res.json('success'); })
          .catch((error) => {
              return res.json(error);
          });
      
        })
        .catch((error) => {
            return res.json(error);
        });
    });
      
    app.get('/get', (req, res) => {
        if (!req.query.mls_number) {
            return res.status(400).send('provide a valid mls_number');
        }
        orm.get(req.query.mls_number)
        .then((data) => { return res.json(data); })
        .catch((error) => {
            return res.json(error);
        });
    });

    app.get('/getbyagent', (req, res) => {
        if (!req.query.agent_id) {
            return res.status(400).send('provide a valid agent_id');
        }
        orm.getByAgent(req.query.agent_id)
        .then((data) => { return res.json(data); })
        .catch((error) => {
            return res.json(error);
        });
    });

};
