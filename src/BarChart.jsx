import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis, Legend }
  from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';


export default function BarChart({ todosByUser }) {

  // Do not show chart if no fetched data exsist.
  if (!todosByUser.length) {
    return
  }

  // Exctract and store fetched data in a suitable for the chart array.
  const myData = todosByUser.map(item => {
    return {
      user: `User ${item.data[0].userId}`,
      completed: item.completed,
      notCompleted: item.notCompleted
    }
  }).reverse()

  // Legend styles
  const Root = props => (
    <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
  )
  const Label = props => (
    <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />
  );

  // Return components.
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
        <Legend
          position='bottom'
          rootComponent={Root}
          labelComponent={Label} />
        <Stack stacks={[{ series: ["Completed", "Total"] }]}
        />
      </Chart>
    </Paper>
  );
}