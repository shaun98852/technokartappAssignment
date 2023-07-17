import {Component} from "react"

import "./App.css"
class App extends Component{
  state={
    invoiceNumber: '',
    invoiceAmount: '',
    invoiceDate: '',
    allDetails:[],
    enteredDate:''
  }

  componentDidMount(){
    this.showInvoiceDetails()
  }

  arrangeList=(detailsFinal)=>{
    console.log(detailsFinal)
    const newDetails=detailsFinal.map(eachItem=>({
      invoiceNumber:eachItem.invoice_Number,
      invoiceDate:eachItem.invoice_Date,
      invoiceAmount:eachItem.invoice_Amount
    }))

    this.setState({allDetails:newDetails})
  }

  showInvoiceDetails= async ()=>{
    const details=await fetch("http://localhost:9000/technoKartapp")
    const finalDetails = await details.json()
    console.log(finalDetails)

    if(details.ok===true){
       this.arrangeList(finalDetails)

      

    }
    // const finalDetails= await details.json()
    
    // console.log(finalDetails)
  }

  // handleChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  enterNumber=(event)=>{
    this.setState({invoiceNumber:event.target.value})
    
  }

  enterAmount=(event)=>{
    this.setState({invoiceAmount:event.target.value})
  }

  enterDate=(event)=>{
    this.setState({invoiceDate:event.target.value})
  }

  savedDate=(event)=>{
    this.setState({enteredDate:event.target.value})
  }

  getDetailsOnYear=async()=>{
    const {enteredDate}=this.state
    const dateSet=enteredDate.split("-");
    const date=dateSet[0] 
    const getDetails=await fetch(`http://localhost:9000/year?date=${date}`);
    const detail= await getDetails.json();
    console.log(detail)
    if(getDetails.ok===true){
      this.arrangeList(detail);
    }

  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello")
    // You can perform further validation or submit the form data to an API here
    const {invoiceNumber,invoiceAmount,invoiceDate}= this.state 
    console.log(invoiceNumber);
    console.log(invoiceAmount);
    console.log(invoiceDate);
    const queryDetails= await fetch(`http://localhost:9000/details?number=${invoiceNumber}&amount=${invoiceAmount}&date=${invoiceDate}`);
    const query= await queryDetails.json();
    console.log(query); 

    // Reset the form fields
    this.setState({
      invoiceNumber: '',
      invoiceAmount: '',
      invoiceDate: '',
  
    });
  };

  render() {
    const { invoiceNumber, invoiceAmount, invoiceDate,enteredDate } = this.state;

    return (
      <div className="background">
        <div className="form">
          <div className="detailsBox">
            <h1 className="detailsHeading">
              Enter Details
            </h1>
          </div>
      <form onSubmit={this.handleSubmit}>
        
        <label className="inputDesign">
          Invoice Number:
          <input
            type="text"
            name="invoiceNumber"
            value={invoiceNumber}
            onChange={this.enterNumber}
          />
        </label>
        <br />
        <label className="inputDesign">
          Invoice Amount:
          <input
            type="text"
            name="invoiceAmount"
            value={invoiceAmount}
            onChange={this.enterAmount}
          />
        </label>
        <br />
        <label className="inputDesign">
          Invoice Date:
          <input
            type="date"
            name="invoiceDate"
            value={invoiceDate}
            onChange={this.enterDate}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>


      <div className="showInvoiceDetaisl">
        <h1 className="heading">Invoice Details</h1>
        <label htmlFor="enterDate" className="inputDesign">Select Date</label>
        <input type="date" value={enteredDate} onChange={this.savedDate} id="enterDate"/>
        <div className="buttonBox">
        <label htmlFor="details" className="inputDesign">Find Details based on year</label>
        <button className="findButton" id="details" onClick={this.getDetailsOnYear}>Find</button>
        </div>
      </div>
      
      
      </div>
      </div>
    );
  }
}

export default App;
