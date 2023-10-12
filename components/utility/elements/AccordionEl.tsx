import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Question, Answer } from "@prisma/client";

type ExtendedQuestion = Question & {
  answers?: Answer[];
  answer?: string;
};

type Props = {
  question: ExtendedQuestion;
  index: number;
  createQuiz?: boolean;
  takeQuiz?: boolean;
};

const AccordionEl: React.FC<Props> = ({
  question,
  index,
  createQuiz,
  takeQuiz,
}) => {
  return (
    <>
      <Accordion type="single" collapsible className="bg-primary">
        <AccordionItem value={`item-${index + 1}`}>
          <AccordionTrigger className="p-2 lg:p-4 text-white font-josefin text-lg">
            <div className="flex items-center gap-2 text-sm md:text-md lg:text-lg xl:text-xl text-left font-josefin pt-1">
              <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl">{`Q${
                index + 1
              }: `}</span>
              <p>{question.question}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {/* IF ACCORDION IS CALLED FROM /create */}
            {createQuiz === true && (
              <>
                {question.type === "Single Select" ? (
                  <div className="flex items-center gap-2 text-sm md:text-md lg:text-lg xl:text-xl text-left font-josefin  pt-1">
                    <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
                      Answer:
                    </span>
                    <p>{question.question}</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 ">
                    {question?.answers?.map((answer, index) => {
                      return (
                        <div className="flex items-center gap-2 text-sm md:text-md lg:text-lg xl:text-xl text-left font-josefin  pt-1">
                          <span
                            className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl ${
                              answer.isCorrect
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >{`A${index + 1}: `}</span>
                          <p>{answer.answer}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
            {/* IF ACCORDION IS CALLED FROM /take/[id] */}
            {takeQuiz === true && (
              <>
                <div className="flex items-center gap-2 text-sm md:text-md lg:text-lg xl:text-xl text-left font-josefin  pt-1">
                  <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
                    Answer:
                  </span>
                  <p>{question.answer}</p>
                </div>
              </>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default AccordionEl;
