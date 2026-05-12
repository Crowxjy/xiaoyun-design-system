import React from 'react';
import { clsx } from 'clsx';
import { Button, ButtonVariant, ButtonSize } from '../Button/Button';

export interface DiagnosisButton {
  text: React.ReactNode;
  type?: ButtonVariant;
}

export interface DiagnosisContentPart {
  text: React.ReactNode;
  bold?: boolean;
  color?: 'primary' | 'danger' | 'success';
  customColor?: string;
  title?: boolean;
  link?: { url?: string; onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void };
  button?: boolean;
  buttonType?: ButtonVariant;
  buttonSize?: ButtonSize;
  iconRight?: React.ReactNode;
  onButtonClick?: (part: DiagnosisContentPart) => void;
}

export interface DiagnosisListItem {
  title?: React.ReactNode;
  text?: React.ReactNode;
  parts?: DiagnosisContentPart[];
}

export interface DiagnosisSection {
  title?: React.ReactNode;
  items: DiagnosisListItem[];
}

export interface DiagnosisCard {
  sections: DiagnosisSection[];
  buttons?: DiagnosisButton[];
}

export interface DiagnosisProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  cards: DiagnosisCard[];
  buttons?: DiagnosisButton[];
  layout?: 'single' | 'multiple';
  onButtonClick?: (buttonIndex: number, button: DiagnosisButton, cardIndex?: number) => void;
  onPartClick?: (part: DiagnosisContentPart) => void;
}

function renderPart(part: DiagnosisContentPart, key: React.Key, onPartClick?: (part: DiagnosisContentPart) => void) {
  if (part.button) {
    return (
      <span key={key} className="xds-diagnosis__item-button">
        <Button
          variant={part.buttonType ?? 'text-primary'}
          size={part.buttonSize ?? 'default-size'}
          rightIcon={part.iconRight}
          onClick={() => {
            part.onButtonClick?.(part);
            onPartClick?.(part);
          }}
        >
          {part.text}
        </Button>
      </span>
    );
  }

  if (part.link) {
    const classes = clsx(
      'xds-diagnosis__item-part',
      'xds-diagnosis__item-link',
      part.bold && 'is-bold',
      part.color && `is-${part.color}`
    );
    return (
      <a
        key={key}
        href={part.link.url ?? '#'}
        className={classes}
        style={part.customColor ? { color: part.customColor } : undefined}
        onClick={(event) => {
          if (!part.link?.url || part.link.url === '#') {
            event.preventDefault();
          }
          part.link?.onClick?.(event);
          onPartClick?.(part);
        }}
      >
        {part.text}
      </a>
    );
  }

  if (part.title) {
    return (
      <span key={key} className="xds-diagnosis__item-title is-inline">
        {part.text}
      </span>
    );
  }

  return (
    <span
      key={key}
      className={clsx(
        'xds-diagnosis__item-part',
        part.bold && 'is-bold',
        part.color && `is-${part.color}`
      )}
      style={part.customColor ? { color: part.customColor } : undefined}
    >
      {part.text}
    </span>
  );
}

function renderContent(item: DiagnosisListItem, onPartClick?: (part: DiagnosisContentPart) => void) {
  if (item.parts?.length) {
    return item.parts.map((part, index) => renderPart(part, index, onPartClick));
  }
  return item.text;
}

export const Diagnosis = React.forwardRef<HTMLDivElement, DiagnosisProps>(
  ({ className, title, cards, buttons = [], layout = 'single', onButtonClick, onPartClick, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('xds-diagnosis', `xds-diagnosis--${layout}`, className)} {...props}>
        {title ? <div className="xds-diagnosis__title">{title}</div> : null}

        <div className="xds-diagnosis__content">
          {cards.map((card, cardIndex) => (
            <div key={cardIndex} className="xds-diagnosis__card">
              {card.sections.map((section, sectionIndex) => (
                <section key={sectionIndex} className="xds-diagnosis__section">
                  {section.title ? <div className="xds-diagnosis__section-title">{section.title}</div> : null}
                  <ol className="xds-diagnosis__list">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="xds-diagnosis__list-item">
                        <span className="xds-diagnosis__item-index">{itemIndex + 1}</span>
                        <span className="xds-diagnosis__item-content">
                          {item.title ? <span className="xds-diagnosis__item-title">{item.title}</span> : null}
                          {renderContent(item, onPartClick)}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}

              {card.buttons?.length ? (
                <div className="xds-diagnosis__footer">
                  {card.buttons.map((button, buttonIndex) => (
                    <Button
                      key={buttonIndex}
                      size="small"
                      variant={button.type ?? 'secondary'}
                      onClick={() => onButtonClick?.(buttonIndex, button, cardIndex)}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {buttons.length && layout === 'single' ? (
          <div className="xds-diagnosis__footer">
            {buttons.map((button, buttonIndex) => (
              <Button
                key={buttonIndex}
                size="small"
                variant={button.type ?? 'secondary'}
                onClick={() => onButtonClick?.(buttonIndex, button)}
              >
                {button.text}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

Diagnosis.displayName = 'Diagnosis';
