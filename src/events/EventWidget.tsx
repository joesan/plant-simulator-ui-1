import * as React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import * as moment from 'moment';
import Utils from '../common/Utils';

interface EventWidgetProps {
  id: string;
  numValues: number;
}

interface EventWidgetState {
  data: Event[];
}

class Event {
  newState: string;
  oldState: string;
  timeStamp: string;
}

class EventWidget extends React.Component<EventWidgetProps, EventWidgetState> {

  constructor(props: EventWidgetProps) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const ws = new WebSocket(Utils.eventsUri(this.props.id));

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.setState((prevState: EventWidgetState) => {
        prevState.data.push(message);
        const start = Math.max(0, prevState.data.length - this.props.numValues);
        const d = prevState.data.slice(start, prevState.data.length);
        return {data: d};
      });
    };
  }

  render() {
    const {data} = this.state;

    return (
        <Paper>
          <Typography variant="headline" component="h3">
            Events (Power Plant {this.props.id})
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Old State</TableCell>
                <TableCell>New State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((n, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{moment(n.timeStamp).format()}</TableCell>
                    <TableCell>{n.oldState}</TableCell>
                    <TableCell>{n.newState}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
    );
  }

}

export default EventWidget;
