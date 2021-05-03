import React, { useState } from "react";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Slider from "react-slick";
import UploadModal from "./UpLoadModal";
import ReactModal from "react-modal";
import { actionCreators as postActions } from "../redux/modules/post";

const ModalDetail = (props) => {
  const dispatch = useDispatch();
  // React.useEffect(() => {}, []);

  //수정 버튼 누르면 수정 모달이 뜨는 효과 구현
  const [is_Editmodal, setEditModal] = useState();

  const openEditModal = () => {
    setEditModal(true);
  };
  const closeDetailModal = () => {
    setEditModal(false);
  };

  //캐러셀 모듈 코드
  var settings = {
    dots: true, // 이미지 밑의 점을 출력할 건지 입력
    infinite: true,
    speed: 500, //이미지 넘어가는 속도
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const comment_list = [
    {
      profileImg:
        "https://images.theconversation.com/files/348622/original/file-20200721-15-dswf3q.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
      username: "hmk1022",
      comment: "힘내시오!",
    },
    {
      profileImg:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhIQEA8PEBAPDw8PDxAPDw8PDw8PFREWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dFx0rLS0rLSstLSstLSstLS0tLS0tLS0rLS0tLS03LS0rNy0tLS0tLTc3Nzc3LS0tNzcrLf/AABEIAKIBOAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAACAwQAAQUG/8QAJhAAAwACAQQDAAIDAQAAAAAAAAECAxEhBBIxQRNRYXGBFKGxBf/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EAB8RAQEBAQADAAMBAQAAAAAAAAABEQISITEDQVFhE//aAAwDAQACEQMRAD8A+kSGY0LSHwe7Xh8jRRhn2IS0PijPptFE2E8ojYxSZ2L0XykvUMZS0IylcxPVTORbkcwUaxhYFDEwWgoCiGudonuS7FPH9E2adEyq6npK0HiR25ChFM5PYM64/slZXn+hLkcR3NqWkcHdgLkvWFgUMxsWkMhCqufr1Ok4/s9PAeb/AOfy0vw9bDGmcv5Ho/i+DyeCemUZUTWjPlr0XoG0Nci6SLiKmT5GJfZyZCotLPIddg41yc6hf7Fg30gt7Zg3JxTtmzAzp8WyrFh0F0vT8bHt68GXXTfnnIX2hGmQWStxnRmODotGPEDTD+P8MoOnXNlgoexiYpL2O7d8kVcOh8DponwsNrkzsXK5leyekWvDwKqRylYjaA0VVAmpNJWdjiOzH0C0dh6AlmGDmbGN6atoo+NMxvWVtJseTUmiCzJh0CsfJfkjxSZcfIqp4LMsAPFwOdJvKL4xFo9So4Iax8l89Me+MIUhJB9vISkrUSDxU0e30PVdy58o8ZFXSVoy/JNjp/Fcr2roTUnMVh0zm+OrdJsQ5Q7IxLnZpEVzX2Ktj3JojkepxyFoVkXse5I+o8j590dfC6oPpp5FzJZ00F25EczauWtE+e9B5L0S5Mm3wjLmNeqZFcHVIMfRXjXAX0J7cS40cNdGJUgzzpmlJ+RlrfkHsNt9Mg1gfo2Fc6ZThAy49PYvL9DP2Dte/wAG9oW+Dsom08HFcaNc7F6DErU7kH+R+X8EFSs6H4/aM8aY6EGoDyGEYeOCzHQm8YeJE32rn0oqNiPjZRvgKURuLzUWWOQPj9eizqsXIuEVOvSbz7IeLghyYuWez8ZH1GMrnpPfDyqRtD8uMCZN9c2e3Eijp5NGMo6aCOuvTXnlTiQy3xo5L5OUYOgp+TqgLQc8cD0sD2hqNIbMexGa9Ez2r4my3raJ5xNjXO2UYsZruMs0tYOA5Xahlsmy2TNqvUJ6jNth4I2tktst6OdGnXqI5u1RjxJDKYFUcb0tmTYGW9GJM+TZw0nLO9KEdQ28XIDgWnjsIa52tCoZTjRPRwmcfGgNaL5gDJhJ8lXlKjOfYy5AcsaGSB+IZIcBowqMZmx0oHJjFp4Vs0MYkbsHowzGuBmKTYpCjhmdq5Hcsk1StlXIrJASnY7BN1MFOPgRn5Y+fqeviG4E/EXfHybLPo1nTG8J8MFGONBYIGPgm9K559BSDlb4AfgPp/JNXGWP/Q+MQWOR3aRemk5TZCbJH2VZqSJ3tlco6KxRyPqNB4MQGce7RmQjLRHkt+h+ViVBrzGXVJiNs9DHHAOHEUaF10fPIEifqr9FFVoltbDn6rqpaRijsMaeTLxetmxiHJa9MTcHNK6eokpBY6GXiFSX9R8W40N7dk+CmVTWzHprz7S5sYpleRE2SOS+ajqEnZG/AKcFbqLMPxQmN7SfA+StIjr6059wisOgdNFTgVbFKLASMmRcVyVa2gp8+3O0G5MuBswTuK+p/jF3iLnomy0hy0rzE/xewKgpfgCY9laiwtSFUBuUglPAaMT1Pod02LXIFzyOx5PCC30OZ7OXArJbY6iarIi+gdnPIag0cjGirUyFvhE2UfmZPSK5T1U1ILHA2cbY6UkXekTkKnSA7htCaYougoH+EMnG34LMHS68jvUhTm1Lh6d+WYtzvSMRtq/GR1I5UnMafgNMlRYpyU9gm4exypscxyUwhMaKYJ6quYXlQpIqqRfaKU7A1sVUlLkXkngcpWJIWmWY2Jxzv0PlD6qeY2avRPNteeUU2uBek1oUp2FaW9+ivEyeMfoqiNC6p8xyoGSjlo6QsukJqRzk52FSpsJpHPQ2pB0PSwMob2g40MSFachFSBHnZS5AtDlKwm8jFqP0OmDsuIp+CfobSNgQypM7fbWT0lcbOfAVTINj8i8U7xi70htUKc7KiaRXIzF0+/IXC8HG2VqcUTUyDfVokoVT/QnEF7sMz5t+DCUzF5iLdexKTOPEcQ6bOeumOTINYxsh6J08RPF9DcYWSTkMrdicymOTdgaR3RGrwHaT5pKWJylcp6TQ/o7ps7P8HN6ZozOT9G7DkMdPJF9LntLXAyMuwsuMTien44H9iflVwE2Ans7KIaRx7B0GxTYQq1sS6DdHJLiK2/Q6F9gHHYjNqtEebKdyZSSq2XxyjvsXcOwT7YiH9jlXrRdRyvxUg9kuFlKRz2e3RzdjrE3Q6hLkIdJaF1sZQFs1jKlt6FVf6bJQpmkjO0NM4EkMx4tlbiZNLRh/xa8mFqvFaq0Njk7khGUfRza6MH2nZbCn9NRGrwNsSkMfJpx+ypcTZo5OpnO85NolQ3IvJCGKzUg0Wal19Cqh72yvt0Jvz4NJWVjTj2OiNAxlO1kJuqmCpojzjMlP8J62XzEd3T8H7/0qnRBKaOun+ivOidYsuye3+g6ZzTHJh267KGpCpTHzIqICpEWU5OfAFQEpWIqORjf0ehjwJeQ3r6K/6J/5/wBRzH2cb5KLnYKw+2Hkfj/HMT1/I35QfjMsRNxU2B+XZy8gXYjqw7H6GVM2bWyxYAMkNeB+ULwqF4zuLFvyN7GUYsftlXr0mcbUn+O0/sOJ0WG+Ijz/AKufj/iZ4jpRSSMLyqvGO3RyMgEm0Th6omkdaEzeg1lFipW8DEhbrYcsVEcciN8lFWvZO72/A+U9YdMoYJhMNsVVHWL+LfsKkzTsCrdmhbkdJqQaPEpwjnxDTJD0eJfxg1JRoFoNHim0NiUF8YaQXopyHsQqqQ3IJjC29sc/0X/HO9DIMsGhkJfQWwSX9uNHOwcBVE6rAKQlASQQtOQHacaGHNBowLhHVJ3R0NPHO0FyGzBowh4wUinRxyPyLxLlBI72nEhaeM5MEdDRiRS0MUhJHdDtTOSqg4kP0c0HkPEvTCSD0btDTwLkH4RmjJC0eLkoIxg08ZHe0xtiGNo2jmzuwDmjJHdnNgBGOJm2I3TaObNsA7oxzZtgHdHDbObGHdG7TbOdwBu07s5s5sCFs7sW2buAaZs4Bs3cAHs2xfcbuDBpmzbF9xu4BpmzgCo2wMwwvuMA0RjGAmOmMBuHTGAMYxhBkYxgDM4YwyriOmMAYxjAGMdMACYxgDGMYAxjGAMcMYAxjGAOHDGGTGZwwBjGMAcMdMAYxjAbGMYA/9k=",
      username: "hmk1022",
      comment: "모달창 이상해요 ㅠ....",
    },
    {
      profileImg:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhIQEA8PEBAPDw8PDxAPDw8PDw8PFREWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dFx0rLS0rLSstLSstLSstLS0tLS0tLS0rLS0tLS03LS0rNy0tLS0tLTc3Nzc3LS0tNzcrLf/AABEIAKIBOAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAACAwQAAQUG/8QAJhAAAwACAQQDAAIDAQAAAAAAAAECAxEhBBIxQRNRYXGBFKGxBf/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EAB8RAQEBAQADAAMBAQAAAAAAAAABEQISITEDQVFhE//aAAwDAQACEQMRAD8A+kSGY0LSHwe7Xh8jRRhn2IS0PijPptFE2E8ojYxSZ2L0XykvUMZS0IylcxPVTORbkcwUaxhYFDEwWgoCiGudonuS7FPH9E2adEyq6npK0HiR25ChFM5PYM64/slZXn+hLkcR3NqWkcHdgLkvWFgUMxsWkMhCqufr1Ok4/s9PAeb/AOfy0vw9bDGmcv5Ho/i+DyeCemUZUTWjPlr0XoG0Nci6SLiKmT5GJfZyZCotLPIddg41yc6hf7Fg30gt7Zg3JxTtmzAzp8WyrFh0F0vT8bHt68GXXTfnnIX2hGmQWStxnRmODotGPEDTD+P8MoOnXNlgoexiYpL2O7d8kVcOh8DponwsNrkzsXK5leyekWvDwKqRylYjaA0VVAmpNJWdjiOzH0C0dh6AlmGDmbGN6atoo+NMxvWVtJseTUmiCzJh0CsfJfkjxSZcfIqp4LMsAPFwOdJvKL4xFo9So4Iax8l89Me+MIUhJB9vISkrUSDxU0e30PVdy58o8ZFXSVoy/JNjp/Fcr2roTUnMVh0zm+OrdJsQ5Q7IxLnZpEVzX2Ktj3JojkepxyFoVkXse5I+o8j590dfC6oPpp5FzJZ00F25EczauWtE+e9B5L0S5Mm3wjLmNeqZFcHVIMfRXjXAX0J7cS40cNdGJUgzzpmlJ+RlrfkHsNt9Mg1gfo2Fc6ZThAy49PYvL9DP2Dte/wAG9oW+Dsom08HFcaNc7F6DErU7kH+R+X8EFSs6H4/aM8aY6EGoDyGEYeOCzHQm8YeJE32rn0oqNiPjZRvgKURuLzUWWOQPj9eizqsXIuEVOvSbz7IeLghyYuWez8ZH1GMrnpPfDyqRtD8uMCZN9c2e3Eijp5NGMo6aCOuvTXnlTiQy3xo5L5OUYOgp+TqgLQc8cD0sD2hqNIbMexGa9Ez2r4my3raJ5xNjXO2UYsZruMs0tYOA5Xahlsmy2TNqvUJ6jNth4I2tktst6OdGnXqI5u1RjxJDKYFUcb0tmTYGW9GJM+TZw0nLO9KEdQ28XIDgWnjsIa52tCoZTjRPRwmcfGgNaL5gDJhJ8lXlKjOfYy5AcsaGSB+IZIcBowqMZmx0oHJjFp4Vs0MYkbsHowzGuBmKTYpCjhmdq5Hcsk1StlXIrJASnY7BN1MFOPgRn5Y+fqeviG4E/EXfHybLPo1nTG8J8MFGONBYIGPgm9K559BSDlb4AfgPp/JNXGWP/Q+MQWOR3aRemk5TZCbJH2VZqSJ3tlco6KxRyPqNB4MQGce7RmQjLRHkt+h+ViVBrzGXVJiNs9DHHAOHEUaF10fPIEifqr9FFVoltbDn6rqpaRijsMaeTLxetmxiHJa9MTcHNK6eokpBY6GXiFSX9R8W40N7dk+CmVTWzHprz7S5sYpleRE2SOS+ajqEnZG/AKcFbqLMPxQmN7SfA+StIjr6059wisOgdNFTgVbFKLASMmRcVyVa2gp8+3O0G5MuBswTuK+p/jF3iLnomy0hy0rzE/xewKgpfgCY9laiwtSFUBuUglPAaMT1Pod02LXIFzyOx5PCC30OZ7OXArJbY6iarIi+gdnPIag0cjGirUyFvhE2UfmZPSK5T1U1ILHA2cbY6UkXekTkKnSA7htCaYougoH+EMnG34LMHS68jvUhTm1Lh6d+WYtzvSMRtq/GR1I5UnMafgNMlRYpyU9gm4exypscxyUwhMaKYJ6quYXlQpIqqRfaKU7A1sVUlLkXkngcpWJIWmWY2Jxzv0PlD6qeY2avRPNteeUU2uBek1oUp2FaW9+ivEyeMfoqiNC6p8xyoGSjlo6QsukJqRzk52FSpsJpHPQ2pB0PSwMob2g40MSFachFSBHnZS5AtDlKwm8jFqP0OmDsuIp+CfobSNgQypM7fbWT0lcbOfAVTINj8i8U7xi70htUKc7KiaRXIzF0+/IXC8HG2VqcUTUyDfVokoVT/QnEF7sMz5t+DCUzF5iLdexKTOPEcQ6bOeumOTINYxsh6J08RPF9DcYWSTkMrdicymOTdgaR3RGrwHaT5pKWJylcp6TQ/o7ps7P8HN6ZozOT9G7DkMdPJF9LntLXAyMuwsuMTien44H9iflVwE2Ans7KIaRx7B0GxTYQq1sS6DdHJLiK2/Q6F9gHHYjNqtEebKdyZSSq2XxyjvsXcOwT7YiH9jlXrRdRyvxUg9kuFlKRz2e3RzdjrE3Q6hLkIdJaF1sZQFs1jKlt6FVf6bJQpmkjO0NM4EkMx4tlbiZNLRh/xa8mFqvFaq0Njk7khGUfRza6MH2nZbCn9NRGrwNsSkMfJpx+ypcTZo5OpnO85NolQ3IvJCGKzUg0Wal19Cqh72yvt0Jvz4NJWVjTj2OiNAxlO1kJuqmCpojzjMlP8J62XzEd3T8H7/0qnRBKaOun+ivOidYsuye3+g6ZzTHJh267KGpCpTHzIqICpEWU5OfAFQEpWIqORjf0ehjwJeQ3r6K/6J/5/wBRzH2cb5KLnYKw+2Hkfj/HMT1/I35QfjMsRNxU2B+XZy8gXYjqw7H6GVM2bWyxYAMkNeB+ULwqF4zuLFvyN7GUYsftlXr0mcbUn+O0/sOJ0WG+Ijz/AKufj/iZ4jpRSSMLyqvGO3RyMgEm0Th6omkdaEzeg1lFipW8DEhbrYcsVEcciN8lFWvZO72/A+U9YdMoYJhMNsVVHWL+LfsKkzTsCrdmhbkdJqQaPEpwjnxDTJD0eJfxg1JRoFoNHim0NiUF8YaQXopyHsQqqQ3IJjC29sc/0X/HO9DIMsGhkJfQWwSX9uNHOwcBVE6rAKQlASQQtOQHacaGHNBowLhHVJ3R0NPHO0FyGzBowh4wUinRxyPyLxLlBI72nEhaeM5MEdDRiRS0MUhJHdDtTOSqg4kP0c0HkPEvTCSD0btDTwLkH4RmjJC0eLkoIxg08ZHe0xtiGNo2jmzuwDmjJHdnNgBGOJm2I3TaObNsA7oxzZtgHdHDbObGHdG7TbOdwBu07s5s5sCFs7sW2buAaZs4Bs3cAHs2xfcbuDBpmzbF9xu4BpmzgCo2wMwwvuMA0RjGAmOmMBuHTGAMYxhBkYxgDM4YwyriOmMAYxjAGMdMACYxgDGMYAxjGAMcMYAxjGAOHDGGTGZwwBjGMAcMdMAYxjAbGMYA/9k=",
      username: "hmk1022",
      comment: "모달창 이상해요 ㅠ....",
    },
    {
      profileImg:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhIQEA8PEBAPDw8PDxAPDw8PDw8PFREWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQFy0dFx0rLS0rLSstLSstLSstLS0tLS0tLS0rLS0tLS03LS0rNy0tLS0tLTc3Nzc3LS0tNzcrLf/AABEIAKIBOAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAACAwQAAQUG/8QAJhAAAwACAQQDAAIDAQAAAAAAAAECAxEhBBIxQRNRYXGBFKGxBf/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EAB8RAQEBAQADAAMBAQAAAAAAAAABEQISITEDQVFhE//aAAwDAQACEQMRAD8A+kSGY0LSHwe7Xh8jRRhn2IS0PijPptFE2E8ojYxSZ2L0XykvUMZS0IylcxPVTORbkcwUaxhYFDEwWgoCiGudonuS7FPH9E2adEyq6npK0HiR25ChFM5PYM64/slZXn+hLkcR3NqWkcHdgLkvWFgUMxsWkMhCqufr1Ok4/s9PAeb/AOfy0vw9bDGmcv5Ho/i+DyeCemUZUTWjPlr0XoG0Nci6SLiKmT5GJfZyZCotLPIddg41yc6hf7Fg30gt7Zg3JxTtmzAzp8WyrFh0F0vT8bHt68GXXTfnnIX2hGmQWStxnRmODotGPEDTD+P8MoOnXNlgoexiYpL2O7d8kVcOh8DponwsNrkzsXK5leyekWvDwKqRylYjaA0VVAmpNJWdjiOzH0C0dh6AlmGDmbGN6atoo+NMxvWVtJseTUmiCzJh0CsfJfkjxSZcfIqp4LMsAPFwOdJvKL4xFo9So4Iax8l89Me+MIUhJB9vISkrUSDxU0e30PVdy58o8ZFXSVoy/JNjp/Fcr2roTUnMVh0zm+OrdJsQ5Q7IxLnZpEVzX2Ktj3JojkepxyFoVkXse5I+o8j590dfC6oPpp5FzJZ00F25EczauWtE+e9B5L0S5Mm3wjLmNeqZFcHVIMfRXjXAX0J7cS40cNdGJUgzzpmlJ+RlrfkHsNt9Mg1gfo2Fc6ZThAy49PYvL9DP2Dte/wAG9oW+Dsom08HFcaNc7F6DErU7kH+R+X8EFSs6H4/aM8aY6EGoDyGEYeOCzHQm8YeJE32rn0oqNiPjZRvgKURuLzUWWOQPj9eizqsXIuEVOvSbz7IeLghyYuWez8ZH1GMrnpPfDyqRtD8uMCZN9c2e3Eijp5NGMo6aCOuvTXnlTiQy3xo5L5OUYOgp+TqgLQc8cD0sD2hqNIbMexGa9Ez2r4my3raJ5xNjXO2UYsZruMs0tYOA5Xahlsmy2TNqvUJ6jNth4I2tktst6OdGnXqI5u1RjxJDKYFUcb0tmTYGW9GJM+TZw0nLO9KEdQ28XIDgWnjsIa52tCoZTjRPRwmcfGgNaL5gDJhJ8lXlKjOfYy5AcsaGSB+IZIcBowqMZmx0oHJjFp4Vs0MYkbsHowzGuBmKTYpCjhmdq5Hcsk1StlXIrJASnY7BN1MFOPgRn5Y+fqeviG4E/EXfHybLPo1nTG8J8MFGONBYIGPgm9K559BSDlb4AfgPp/JNXGWP/Q+MQWOR3aRemk5TZCbJH2VZqSJ3tlco6KxRyPqNB4MQGce7RmQjLRHkt+h+ViVBrzGXVJiNs9DHHAOHEUaF10fPIEifqr9FFVoltbDn6rqpaRijsMaeTLxetmxiHJa9MTcHNK6eokpBY6GXiFSX9R8W40N7dk+CmVTWzHprz7S5sYpleRE2SOS+ajqEnZG/AKcFbqLMPxQmN7SfA+StIjr6059wisOgdNFTgVbFKLASMmRcVyVa2gp8+3O0G5MuBswTuK+p/jF3iLnomy0hy0rzE/xewKgpfgCY9laiwtSFUBuUglPAaMT1Pod02LXIFzyOx5PCC30OZ7OXArJbY6iarIi+gdnPIag0cjGirUyFvhE2UfmZPSK5T1U1ILHA2cbY6UkXekTkKnSA7htCaYougoH+EMnG34LMHS68jvUhTm1Lh6d+WYtzvSMRtq/GR1I5UnMafgNMlRYpyU9gm4exypscxyUwhMaKYJ6quYXlQpIqqRfaKU7A1sVUlLkXkngcpWJIWmWY2Jxzv0PlD6qeY2avRPNteeUU2uBek1oUp2FaW9+ivEyeMfoqiNC6p8xyoGSjlo6QsukJqRzk52FSpsJpHPQ2pB0PSwMob2g40MSFachFSBHnZS5AtDlKwm8jFqP0OmDsuIp+CfobSNgQypM7fbWT0lcbOfAVTINj8i8U7xi70htUKc7KiaRXIzF0+/IXC8HG2VqcUTUyDfVokoVT/QnEF7sMz5t+DCUzF5iLdexKTOPEcQ6bOeumOTINYxsh6J08RPF9DcYWSTkMrdicymOTdgaR3RGrwHaT5pKWJylcp6TQ/o7ps7P8HN6ZozOT9G7DkMdPJF9LntLXAyMuwsuMTien44H9iflVwE2Ans7KIaRx7B0GxTYQq1sS6DdHJLiK2/Q6F9gHHYjNqtEebKdyZSSq2XxyjvsXcOwT7YiH9jlXrRdRyvxUg9kuFlKRz2e3RzdjrE3Q6hLkIdJaF1sZQFs1jKlt6FVf6bJQpmkjO0NM4EkMx4tlbiZNLRh/xa8mFqvFaq0Njk7khGUfRza6MH2nZbCn9NRGrwNsSkMfJpx+ypcTZo5OpnO85NolQ3IvJCGKzUg0Wal19Cqh72yvt0Jvz4NJWVjTj2OiNAxlO1kJuqmCpojzjMlP8J62XzEd3T8H7/0qnRBKaOun+ivOidYsuye3+g6ZzTHJh267KGpCpTHzIqICpEWU5OfAFQEpWIqORjf0ehjwJeQ3r6K/6J/5/wBRzH2cb5KLnYKw+2Hkfj/HMT1/I35QfjMsRNxU2B+XZy8gXYjqw7H6GVM2bWyxYAMkNeB+ULwqF4zuLFvyN7GUYsftlXr0mcbUn+O0/sOJ0WG+Ijz/AKufj/iZ4jpRSSMLyqvGO3RyMgEm0Th6omkdaEzeg1lFipW8DEhbrYcsVEcciN8lFWvZO72/A+U9YdMoYJhMNsVVHWL+LfsKkzTsCrdmhbkdJqQaPEpwjnxDTJD0eJfxg1JRoFoNHim0NiUF8YaQXopyHsQqqQ3IJjC29sc/0X/HO9DIMsGhkJfQWwSX9uNHOwcBVE6rAKQlASQQtOQHacaGHNBowLhHVJ3R0NPHO0FyGzBowh4wUinRxyPyLxLlBI72nEhaeM5MEdDRiRS0MUhJHdDtTOSqg4kP0c0HkPEvTCSD0btDTwLkH4RmjJC0eLkoIxg08ZHe0xtiGNo2jmzuwDmjJHdnNgBGOJm2I3TaObNsA7oxzZtgHdHDbObGHdG7TbOdwBu07s5s5sCFs7sW2buAaZs4Bs3cAHs2xfcbuDBpmzbF9xu4BpmzgCo2wMwwvuMA0RjGAmOmMBuHTGAMYxhBkYxgDM4YwyriOmMAYxjAGMdMACYxgDGMYAxjGAMcMYAxjGAOHDGGTGZwwBjGMAcMdMAYxjAbGMYA/9k=",
      username: "hmk1022",
      comment: "모달창 이상해요 ㅠ....",
    },
  ];

  const is_comment = comment_list ? true : false;
  const [comments, setComments] = useState();
  const ok_submit = comments ? true : false;

  const selectComment = (e) => {
    setComments(e.target.value);
  };

  //////////////////////////////////////////////////////////////////////////////////
  //이미지 스타일 컴포넌트 다른 위로 올려서 props로 이미지를 바로 받는게 좋은 것 같다

  const ModalImg = styled.img`
    background-image: url(${props.imgUrl});
    background-size: cover;
    object-fit: cover;
    background-position: 0px;
    background-repeat: no-repeat;
    border: none;
    box-sizing: border-box;
    width: 100%;
    height: 42.5vh;
    max-height: 350px;
    @media (max-width: 1440px) {
      // 1450밑으로 넓이가 내려가면
      /* all: unset; */
      background-image: url(${props.imgUrl});
      background-size: cover;
      object-fit: cover;
      background-position: 0px;
      background-repeat: no-repeat;
      border: none;
      box-sizing: border-box;
      width: 100%;
      height: 35vh;
    }
    @media (max-width: 600px) {
      // 1450밑으로 넓이가 내려가면
      /* all: unset; */
      background-image: url(${props.imgUrl});
      background-size: cover;
      object-fit: cover;
      background-position: 0px;
      background-repeat: no-repeat;
      border: none;
      box-sizing: border-box;
      width: 100%;
      height: 40vh;
    }
  `;

  //작성 날짜 설정하기
  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  return (
    <React.Fragment>
      <Component onClick={props.close} />

      <ModalComponent>
        <ModalHeader>
          <ModalLeftHeader>
            <ProCircle src={props.profile_image_url} />
            <ModalAuthor>username</ModalAuthor>
            <PostDate>방금 전{/* {timeForToday(props.insert_dt)} */}</PostDate>
            <ExitContainer>
              <ExitBtn onClick={props.close}>
                <CloseIcon fontSize="large" />
              </ExitBtn>
            </ExitContainer>
          </ModalLeftHeader>
          {/* {props.user_id === props.is_me ? (
              <ModalRightHeader onClick={props.openChangeModal}>
                <MoreHorizIcon height="14px" width="14px" cursor="pointer" />
              </ModalRightHeader>
            ) : null} */}
        </ModalHeader>
        {/* 이미지 슬라이드 구현 props로 받는 이미지의 개수가 1개를 초과할때  */}
        {/* 그 수만큼 map함수로 출력해준다 */}
        {props.imgUrl.length > 1 ? (
          <Slider {...settings}>
            {props.imgUrl.map((p, idx) => {
              return (
                <div>
                  <ModalImg src={props.imgUrl[idx]} />
                </div>
              );
            })}
          </Slider>
        ) : (
          <ModalImg />
        )}

        <ModalBottomContainer>
          <InfoBox>
            <InfoBoxInner>
              <div>
                <FavoriteBorderIcon /> 0
              </div>
              {/* 작성자 에게만 보이게 설정  */}
              <ModalEdit>
                <React.Fragment onClick={props.close}>
                  <EditBtn
                    onClick={() => {
                      setEditModal(true);
                    }}
                  >
                    수정
                  </EditBtn>
                </React.Fragment>
                /
                <DeleteBtn
                  onClick={(e) => {
                    // e.prevent..., e.stopPro.. 이것들로 이벤트 버블링을 막는다
                    e.preventDefault();
                    e.stopPropagation();
                    // 클릭하면 게시물 삭제
                    dispatch(postActions.deletePostAPI(props.id));
                  }}
                >
                  삭제
                </DeleteBtn>
              </ModalEdit>
            </InfoBoxInner>
            <React.Fragment>
              <PostTilte>{props.title}</PostTilte>
              <PostContents>{props.content}</PostContents>
              <PostTime>방금전</PostTime>
            </React.Fragment>
          </InfoBox>
          <ModalCmtBox>
            {is_comment
              ? comment_list.map((c, idx) => {
                  //여기서 댓글을 입력하고 map으로 props 값을 돌려서 화면을 띄우게 해줌

                  //댓글이 2개보다 작다면? 1개라면?
                  return (
                    <ReplyBox>
                      <Replys>
                        <ReplyLeft>
                          <ReplyImg src={c.profileImg}></ReplyImg>
                          <ReplyWriter>{c.username}</ReplyWriter>
                          <Reply>{c.comment}</Reply>
                        </ReplyLeft>
                        <ReplyRight>
                          <CmtDate>방금 전</CmtDate>
                          <CmtDeleteBtn>
                            <DeleteForeverIcon />
                          </CmtDeleteBtn>
                        </ReplyRight>
                      </Replys>
                    </ReplyBox>
                  );
                })
              : null}
          </ModalCmtBox>
          <ModalCmtInputBox>
            <CommentInput
              type="text"
              placeholder="댓글달기..."
              onChange={selectComment}
              value={comments}
            />
            {ok_submit ? (
              <UploadBtn>게시</UploadBtn>
            ) : (
              <UploadBtn style={{ opacity: "0.3" }}>게시</UploadBtn>
            )}
          </ModalCmtInputBox>
        </ModalBottomContainer>
      </ModalComponent>
      {is_Editmodal ? (
        <UploadModal close={closeDetailModal} {...props} />
      ) : null}
    </React.Fragment>
  );
};

const Component = styled.div`
  position: fixed;
  opacity: 0.4;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const ModalComponent = styled.div`
  position: fixed !important;
  width: 580px;
  height: 790px;
  /* overflow: hidden; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  border: none;
  box-sizing: border-box;
  min-width: 380px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    position: fixed;
    width: 35vw;
    height: 70vh;
    /* overflow: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: white; */
    z-index: 1000;
    border: none;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    position: absolute;
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: white; */
    z-index: 1000;
    border: none;
    box-sizing: border-box;

    z-index: 7000;
  }
  /* @media (max-width: 950px) {
    width: 350px;
  }
  @media (max-width: 350px) {
    width: 100%;
  } */
`;

const ExitContainer = styled.div`
  z-index: 30;
  position: fixed;
  top: 0;
  right: 0;
  padding: 5px;
`;

const ExitBtn = styled.button`
  cursor: pointer;
  color: lightgray;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`;

const ModalBottomContainer = styled.div`
  text-align: left;
  width: 550px;
  height: 325px;
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    text-align: left;
    width: 100%;
    height: 30vh; // 이거 올려주니까 댓글창이보인다..!
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    /* all: unset; */
    text-align: left;
    width: 100%;
    height: 50vh; // 이거 올려주니까 댓글창이보인다..!
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0px auto;
  }
  /* justify-content: space-between; */

  /* border-left: 1px solid #efefef; */
`;

const ModalHeader = styled.div`
  padding: 1.5vh;
  /* border-bottom: 1px solid #efefef; */
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
`;
const ModalLeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

// const ModalRightHeader = styled.div`
//   cursor: pointer;
// `;

const ProCircle = styled.img`
  margin-left: 0.1vw;
  height: 3.5vh;
  width: 3.5vh;
  border-radius: 50%;
  background-size: cover;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;
`;
const ModalAuthor = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-right: 5px;
`;

const PostDate = styled.span`
  font-size: 0.3rem;
  opacity: 0.3;
  padding-top: 0.35vh;
`;
const InfoBox = styled.div`
  width: 100%;
  height: 20vh;
  text-align: left;
  margin: 0px auto;
  border-bottom: 1px solid #efefef;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    width: calc(100% - 2vw); //패딩대신... 오,....
    height: 20vh;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    width: calc(100% - 7vw); //패딩대신... 오,....
    height: 22vh;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
  }
`;

const InfoBoxInner = styled.div`
  width: 550px; //요놈 크기 바꿔
  height: 33px;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    width: 100%;
    height: 20vh;
    padding: 0px;
  }
`;

const ModalEdit = styled.div`
  opacity: 0.5;
  font-size: 0.7rem;
`;

const PostTilte = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  width: 550px;
  margin-bottom: 10px;
`;
const PostContents = styled.div`
  font-size: 1rem;
  opacity: 0.6;
  width: 550px;
  margin-top: 3px;
`;

const PostTime = styled.div`
  font-size: 0.7rem;
  opacity: 0.4;
  margin: 15px 0px 8px 0px;
`;
const ModalCmtInputBox = styled.div`
  margin-bottom: -4.5vh;
  width: 100%;
  height: 10vh;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
  box-sizing: border-box;
  border: 2px solid #efefef;
  background-color: white;
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
  }
`;

const ModalCmtBox = styled.div`
  padding: 0px 0px;
  display: flex;
  flex-direction: column;
  height: 38vh;
  background-color: white;

  /* 아래 태그는 댓글이 많으면 
  스크롤로 아래 부분이 위로 올라가게 해서 
  댓글이 보여지게 함 */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면
    flex-direction: column;

    padding: 0px 14px;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ReplyBox = styled.div`
  /* padding: 5px 25px 0px 0px; */
  align-items: center;
  /* margin-left: -12px; */
  width: 100%;
  margin: auto auto;
`;

const Replys = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  justify-content: space-between;
  height: 3vh;
`;
const ReplyImg = styled.div`
  height: 3vh;
  width: 3vh;
  border-radius: 50%;
  background-size: cover;
  margin-right: 10px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  cursor: pointer;
`;

const ReplyWriter = styled.div`
  font-size: 1.5vh;
  font-weight: bold;
  padding-right: 10px;
`;

const Reply = styled.div`
  font-size: 14px;
`;

const ReplyLeft = styled.div`
  display: flex;
`; // space-between 효과 주기위해서 쓴다
const ReplyRight = styled.div`
  display: flex;
`;

const CmtDate = styled.div`
  font-size: 0.2rem;
  margin: auto 0;
  opacity: 0.3;
`;

const CmtDeleteBtn = styled.button`
  height: 0.3vh;
  width: 0.3vh;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  opacity: 0.2;
  margin-right: 1.3vw;
  margin-bottom: 3.3vh;
  &:hover {
    opacity: 1;
  }
`;
const CommentInput = styled.input`
  background: white;
  border: none;
  outline: none;
  width: 100%;
  padding: 10px;
  background-color: white;
`;
const UploadBtn = styled.div`
  font-size: 14px;
  color: #3897f0;
  cursor: pointer;
  opacity: 1;
  font-weight: 600;
  margin: 10px 5px 0px 0px;
  /* padding-bottom: 5px; */
  width: 30px;
  @media (max-width: 1440px) {
    // 1450밑으로 넓이가 내려가면

    margin: 5px 5px 0px 0px;
  }
  @media (max-width: 600px) {
    // 1450밑으로 넓이가 내려가면
    margin: 10px 5px 0px 0px;
    width: 40px;
  }
`;

const EditBtn = styled.span`
  cursor: pointer;
`;

const DeleteBtn = styled.span`
  margin-left: 1px;
  cursor: pointer;
`;

export default ModalDetail;
