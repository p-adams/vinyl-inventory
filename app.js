var RECORDS = [
  {genre: "Hip Hop", price: "$15.99", stocked: true, title: "Paul’s Boutique", artist:"Beastie Boys"},
  {genre: "Hip Hop", price: "$30.00", stocked: true, title: "Stillmatic", artist:"Nas"},
  {genre: "Rock", price: "$20.00", stocked: false, title: "Blonde on Blonde", artist:"Bob Dylan"},
  {genre: "Rock", price: "$25.00", stocked: true, title: "Ride the Lightning", artist:"Metallica"},
  {genre: "Rock", price: "$13.50", stocked: false, title: "The Soft Bulletin", artist:"The Flaming Lips"},
  {genre: "Funk", price: "$22.00", stocked: false, title: "Maggot Brain", artist:"Funkadelic"},
  {genre: "Funk", price: "$30.00", stocked: true, title: "1999", artist:"Prince"}
];

var SearchBar = React.createClass({
    handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
    render:function(){
        return(
            <div>
               <input 
                    type="text"
                    placeholder="search vinyl"
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    />
               <p>
                  <input
                    type="checkbox"
                    checked={this.props.inStockOnly}
                    ref="inStockOnlyInput"
                    onChange={this.handleChange}
                    />
                  {' '}
                  Only show records in stock
               </p>
            </div>
        )
    }
});

var VinylGenreRow = React.createClass({
   render: function(){
       return(
           <tr><th colSpan="3" className="list">{this.props.genre}</th></tr>
       )
   } 
});

var VinylRow = React.createClass({
   render:function(){
       //as is --> is the record in stock? print the title, else print the title in red
       var aRecord = this.props.record.stocked ? 
       this.props.record.title :
       <span style={{color: 'red'}}>
            {this.props.record.title}
       </span>;
       return(
          <tr>
              <td>{aRecord}</td>
              <td>{this.props.record.artist}</td>
              <td>{this.props.record.price}</td>
           </tr>
       )
   }
    
});

var VinylAlbumTable = React.createClass({
   render:function(){
       var listOfRecords = [];
       var finalGenre = null;
       this.props.records.forEach(function(record){
        if (record.title.indexOf(this.props.filterText) === -1 ||
         (!record.stocked && this.props.inStockOnly)) {
            return;
        }
          if(record.genre!==finalGenre){
            listOfRecords.push(<VinylGenreRow genre={record.genre} key={record.genre}/>);
          }
          listOfRecords.push(<VinylRow record={record} key={record.title}/>);
          finalGenre = record.genre;
       }.bind(this));
       return(
          <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody >{listOfRecords}</tbody>
          </table>
       )
   } 
});

var VinylInventory = React.createClass({
    getInitialState: function(){
      return{
          filterText: '',
          inStockOnly: false
      }
    },
    handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
   },
    render: function(){
        return(
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <VinylAlbumTable 
                    records={this.props.records}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}   
                />
            </div>
        )
    }
})
ReactDOM.render(<VinylInventory records={RECORDS}/>, document.getElementById('app'));