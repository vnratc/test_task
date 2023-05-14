import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';


export default function BarChart({ todosByUser }) {
  if (todosByUser.length) {
    if (todosByUser.length) console.log(todosByUser)
    const myData = todosByUser.map(item => {
      return { user: "User " + item.data[0].userId, completed: item.completed, notCompleted: item.notCompleted }
    }).reverse()

    const Root = props => (
      <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
    )
    const Label = props => (
      <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
    );

    return (
      <Paper>
        <Chart data={myData}>
          <ArgumentAxis />
          <ValueAxis max={20} />

          <BarSeries
            name="Completed"
            valueField="completed"
            argumentField="user"
          />
          <BarSeries
            name="Total"
            valueField="notCompleted"
            argumentField="user"
          />

          <Title text="Todos Ratio" />
          <Animation />

          <Legend position='bottom' rootComponent={Root} labelComponent={Label} />

          <Stack stacks={[
            { series: ["Completed", "Total"] },
          ]}
          />
        </Chart>
      </Paper>
    );
  }
}