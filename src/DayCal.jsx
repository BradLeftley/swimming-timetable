import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  Text,
  Heading,
  List,
  ListItem,
  ListIcon,
  SkeletonText,
} from '@chakra-ui/react';
import { MdAccessTime } from 'react-icons/md';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AvailabilityIndicator from './AvailbilityIndicator';

const apiUrl = process.env.REACT_APP_SWIMMING_ENDPOINT_TOOTING;

function toIsoStringg(date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      return (num < 10 ? '0' : '') + num;
    };

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' +
    pad(Math.abs(tzo) % 60)
  );
}

const SwimTimesCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [swimTimes, setSwimTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchSwimTimes = async () => {
    const formattedDate = toIsoStringg(date).slice(0, 19).replace('T', ' ');
    console.log(formattedDate);
    setIsLoading(true);
    const queryParams = `?locationGroupId=8ecba194-543b-4235-824d-746e2f0e9fdf&date=${formattedDate}&endDate=null`;
    const response = await fetch(`${apiUrl}${queryParams}`);
    const data = await response.json();
    const swimTimes = data
      .filter(event => event.ActivityCode === 'ST03')
      .sort((a, b) => a.StartTime.localeCompare(b.StartTime));
    setSwimTimes(swimTimes);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSwimTimes();
  }, [date]);

  const handleDateChange = newDate => {
    setDate(new Date(newDate.setHours(0, 0, 0, 0)));
  };

  return (
    <Box>
      <Heading
        padding={10}
        textAlign={'center'}
        background="lightblue"
        marginBottom={5}
        size="md"
      >
        🏊 Swim Times - {date.toLocaleDateString()}
      </Heading>
      <Stack spacing="15" alignItems="center" mb="1">
        <Button
          onClick={() => handleDateChange(new Date(date.getTime() - 86400000))}
        >
          Previous Day
        </Button>
        <Calendar value={date} onChange={handleDateChange} />
        <Button
          onClick={() => handleDateChange(new Date(date.getTime() + 86400000))}
        >
          Next Day
        </Button>
      </Stack>
      <Box>
        {!isLoading && swimTimes.length > 0 ? (
          <List
            spacing="5"
            background={'lightblue'}
            padding="10"
            margin={5}
            borderRadius={5}
          >
            {swimTimes.map(event => (
              <ListItem key={event.EventId}>
                <Text fontWeight={'bold'}>
                  <ListIcon as={MdAccessTime} color="blue.500" />
                  {new Date(event.StartTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  -{' '}
                  {new Date(event.EndTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {/* - {event.DisplayName} - {event.AvailablePlaces} -{' '}
                  {event.TotalPlaces} */}
                  - {event.DisplayName}
                </Text>
                <AvailabilityIndicator
                  total={event.TotalPlaces}
                  available={event.AvailablePlaces}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <>
            {isLoading && (
              <List
                spacing="5"
                background={'lightblue'}
                padding="10"
                margin={5}
                borderRadius={5}
              >
                <ListItem>
                  <SkeletonText />
                </ListItem>
                <ListItem>
                  <SkeletonText />
                </ListItem>
                <ListItem>
                  <SkeletonText />
                </ListItem>
                <ListItem>
                  <SkeletonText />
                </ListItem>
                <ListItem>
                  <SkeletonText />
                </ListItem>
              </List>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SwimTimesCalendar;
