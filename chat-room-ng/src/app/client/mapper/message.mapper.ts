import { Message } from '../../domain/model/message.model';
import { MessageDto } from '../dto/message.dto';

export function messageToDto(message: Message): MessageDto {
  let { date, ...rest} = message;

  return {
    timestamp: date.getTime(),
    ...rest
  }
}

export function messageToModel(messageDto: MessageDto): Message {
  let { timestamp, ...rest} = messageDto;

  return {
    date: new Date(timestamp),
    ...rest
  }
}
