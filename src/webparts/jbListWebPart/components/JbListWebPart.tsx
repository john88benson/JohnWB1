import * as React from 'react';
import * as jquery from 'jquery';
import styles from './JbListWebPart.module.scss';
import { IJbListWebPartProps } from './IJbListWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';


export interface IJbListWebPartState{
  items:[
    {
      "Aircraft": "",
      "Nation": "",
      "Manufacturer": "",
      "Type": "",
      "CarrierCapable": "",
      "NumberBuilt": ""
    }]
}

export default class JbListWebPart extends React.Component<IJbListWebPartProps, IJbListWebPartState> {
  public constructor(props: IJbListWebPartProps, state: IJbListWebPartState){
    super(props);
    this.state = {
      items: [
        {
          "Aircraft": "",
          "Nation": "",
          "Manufacturer": "",
          "Type": "",
          "CarrierCapable": "",
          "NumberBuilt": ""
        }
      ]
    };
  }

  public componentDidMount(){
    var reactHandler = this;
    jquery.ajax({
      url:`${this.props.siteurl}/Lists/getbytitle('John React WB List')/items`, 
      type: "GET",
       headers:{'Accept': 'application/json; odata=verbose;'}, 
        success: function(resultData) { 
          reactHandler.setState({ items: resultData.d.results }); 
        }, 
        error : function(jqXHR, textStatus, errorThrown) { 
        } 
    });
  }
  
  public render(): React.ReactElement<IJbListWebPartProps> {
    return (
       <div className={styles.wsbPanelStyle} >
        <br></br>
    
          <br></br>
          <div className={styles.wsbTableCaptionStyle} > Demo : Retrieve SharePoint List Items using SPFx , REST API  & React JS  </div>
          <br></br>
           <div className={styles.wsbHeaderCaptionStyle} > Aircaft Details</div>
          <div className={styles.wsbTableStyle} >  
             
            <div className={styles.wsbHeaderStyle} > 
              <div className={styles.wsbCellStyle}>Aircraft</div> 
              <div className={styles.wsbCellStyle}>Nation</div> 
              <div className={styles.wsbCellStyle}>Manufacturer</div> 
              <div className={styles.wsbCellStyle}>Role</div>
              <div className={styles.wsbCellStyle}>Carrier Capable</div>  
              <div className={styles.wsbCellStyle}>Number Built</div>
                      
            </div> 
             
              {this.state.items.map(function(item,key){ 
                 
                return (<div className={styles.wsbRowStyle} key={key}> 
                    <div className={styles.wsbCellStyle}>{item.Aircraft}</div> 
                    <div className={styles.wsbCellStyle}>{item.Nation}</div> 
                     <div className={styles.wsbCellStyle}>{item.Manufacturer}</div>
                      <div className={styles.wsbCellStyle}>{item.Type}</div>
                      <div className={styles.wsbCellStyle}>{item.CarrierCapable}</div>
                      <div className={styles.wsbCellStyle}>{item.NumberBuilt}</div>
           
                  </div>); 
              })} 
                     
          </div> 
      </div>
    );
  }
}
