import {Component} from "react"
// import Popup from 'reactjs-popup'
// import { DatePicker } from 'antd'



import "./App.css"
class App extends Component{

 

  state={
    invoiceNumber: '',
    invoiceAmount: '',
    invoiceDate: '',
    allDetails:[],
    enteredDate:'',
    detailsToShow:true
  }

  componentDidMount(){
    this.showInvoiceDetails()
  }

  arrangeList=(detailsFinal)=>{
   
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
   

    if(details.ok===true){
       this.arrangeList(finalDetails)

      

    }

  }

 

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

  deleteInvoice=async (Item)=>{
    const {invoiceAmount,invoiceDate,invoiceNumber}= Item
    const queryDetails= await fetch(`http://localhost:9000/delete?number=${invoiceNumber}&amount=${invoiceAmount}&date=${invoiceDate}`);
    this.showInvoiceDetails();
  }

  getDetailsOnYear=async()=>{
    const {enteredDate,allDetails}=this.state
    if(enteredDate!=""){
     
      const requiredDate=enteredDate.split("-")[0]
    
  
    const listNew=allDetails.filter(eachItem=>eachItem.invoiceDate.split("-")[0]==requiredDate)
   
    if(listNew.length>0){
      this.setState({allDetails:listNew,detailsToShow:true})
    }
    else{
      this.setState({detailsToShow:false})
    }
   

  }

  }

  handleSubmit = async (e) => {
    e.preventDefault();
   
    // You can perform further validation or submit the form data to an API here
    const {invoiceNumber,invoiceAmount,invoiceDate}= this.state 

    const queryDetails= await fetch(`http://localhost:9000/details?number=${invoiceNumber}&amount=${invoiceAmount}&date=${invoiceDate}`);
    console.log(queryDetails);

    // Reset the form fields
    if(queryDetails.ok===true){
    this.setState({
      invoiceNumber: '',
      invoiceAmount: '',
      invoiceDate: '',
  
    },this.showInvoiceDetails);

  }
  };

  render() {
    const { invoiceNumber, invoiceAmount, invoiceDate,enteredDate,allDetails ,detailsToShow} = this.state;
    // const {RangePicker}= DatePicker;
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


      <div className="showInvoiceDetails">
        <h1 className="heading">Invoice Details</h1>
        <label htmlFor="enterDate" className="inputDesign">Find Invoice based on Year</label>
        <input type="date" value={enteredDate} onChange={this.savedDate} id="enterDate"/>
        {/* <RangePicker placeholder="select date" onChange={this.savedDate} className="rangePicker" /> */}
        <button className="findButton" id="details" onClick={this.getDetailsOnYear}>Find</button>
        
       
      </div>
        

        {/* Display the invoices */}
        <div className="invoices">
          <div className="headings">
            <p>Invoice No</p>
            <p>Invoice Amount</p>
            <p>Invoice Date</p>
            <p>Edit/Delete</p>
          </div>
          {detailsToShow? <ul className="unList">
            {allDetails.map(eachItem=>{

              return(<li className="listItem"><p className="eachItem">{eachItem.invoiceNumber}</p>
              <p className="eachItem">{eachItem.invoiceAmount}</p>
              <p className="eachItem">{eachItem.invoiceDate}</p>
              <div className="buttons">
              <button className="editButton">Edit</button>
                   
              <button className="deleteButton" onClick={()=>(this.deleteInvoice(eachItem))}>Delete</button>
              </div>
              </li>)
            })}
          </ul>:<div className="noDetailsBackground">
            <h1 className="noDetailsHeading">No Invoice Details Found</h1></div>}
        </div>
      
      </div>
      </div>
    );
  }
}

export default App;
