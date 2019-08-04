import React, {useState} from 'react'
import { IonInput, IonButton, IonContent, IonGrid, IonRow } from "@ionic/react";

export type SubmitProps = { onSubmit: (value: string) => void };
export const Submit: React.FC<SubmitProps> = ({ onSubmit }) => {
  // console.log({ onSubmit })
  const [currentMessage, setMessage] = useState("");
  const handleSubmit = () => {
    console.log('submitting', currentMessage)
    onSubmit(currentMessage)
  }
  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonInput
            autofocus
            placeholder="Message ..."
            value={currentMessage}
            onIonChange={e =>{
                // @ts-ignore
                setMessage(e.target.value)
            }
            }
          />
          <IonButton
            onClick={handleSubmit}
          >
            Send
          </IonButton>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default Submit;
