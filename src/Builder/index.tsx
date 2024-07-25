import { type ChangeEvent, type FormEvent, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import useBuilder from "../BuilderContext/useBuilder";
import {
    Banner,
    Button,
    ButtonGroup,
    Checkbox,
    Container,
    Item,
    List,
    SearchWithSuggestions,
    Select,
    Spinner,
    TextField,
} from "../components";
import {
    DISPLAY_ORDER,
    DISPLAY_ORDER_LABELS,
    ERROR_CODES,
    FIELD_KEYS,
    type State,
    TEXT_VALUE_MAX_LENGTH,
    WARN_CODES,
} from "../models";
import useSubmitData from "../shared/useSubmitData";

export default function Builder() {
    const defaultChoiceInputRef = useRef<HTMLInputElement>(null);

    const {
        hasErrors,
        state,
        addNewChoice,
        removeChoice,
        resetAll,
        setDefaultChoice,
        setDisplayOrder,
        setLabel,
        setMultiselect,
        setNewChoice,
        setRequired,
    } = useBuilder();

    const {
        fields: {
            [FIELD_KEYS.Choices]: choicesData,
            [FIELD_KEYS.DefaultChoice]: defaultChoiceData,
            [FIELD_KEYS.DisplayOrder]: displayOrderData,
            [FIELD_KEYS.Label]: labelData,
            [FIELD_KEYS.Multiselect]: multiselectData,
            [FIELD_KEYS.NewChoice]: newChoiceData,
            [FIELD_KEYS.Required]: requiredData,
        },
    } = state;

    const choices = choicesData.value;
    const defaultChoice = defaultChoiceData.value;
    const displayOrder = displayOrderData.value;
    const label = labelData.value;
    const multiselect = multiselectData.value;
    const newChoice = newChoiceData.value;
    const required = requiredData.value;

    const updatedAt = state.updatedAt;

    const {
        error,
        isPending,
        isSuccess,
        mutate,
        reset: resetMutationState,
    } = useSubmitData();

    const displayOrderOptions = Object.values(DISPLAY_ORDER);

    const displayOrderOptionLabels = Object.values(DISPLAY_ORDER_LABELS);

    const defaultChoiceSuggestions = choices.filter((choice) =>
        choice.toLowerCase().includes(defaultChoice.toLowerCase()),
    );

    const isDefaultChoiceDropdownDisabled = isPending;

    const isDefaultChoiceDropdownVisible =
        Boolean(defaultChoiceSuggestions.length) &&
        defaultChoiceInputRef.current === document.activeElement &&
        !isPending;

    const isDisplayOrderSelectDisabled = isPending;

    const isLabelInputDisabled = isPending;

    const isMultiselectCheckboxDisabled = isPending;

    const isNewChoiceInputButtonDisabled =
        Boolean(newChoiceData.validation.errorCode) ||
        newChoiceData.validation.warnCode === WARN_CODES.TooMany ||
        !newChoiceData.value ||
        isPending;

    const isNewChoiceInputDisabled =
        newChoiceData.validation.errorCode === ERROR_CODES.TooMany || isPending;

    const isRequiredCheckboxDisabled = isPending;

    const isResetButtonDisabled = !updatedAt || isPending;

    const isSubmitButtonDisabled = hasErrors || isPending;

    const submitButtonLabel = isPending ? <Spinner /> : "Submit";

    let choicesError = "";
    let choicesWarning = "";
    let choicesDescription = "";

    if (
        choicesData.validation.errorCode === ERROR_CODES.Required &&
        updatedAt
    ) {
        choicesError = "This field is required and cannot be left empty";
    } else if (
        choicesData.validation.warnCode === WARN_CODES.SomeTooLong &&
        updatedAt
    ) {
        choicesWarning = `One or more items exceed the maximum length of ${TEXT_VALUE_MAX_LENGTH} characters and will be truncated upon submission`;
    } else if (
        choicesData.validation.warnCode === WARN_CODES.TooMany &&
        updatedAt
    ) {
        choicesDescription = "You have reached the maximum number of items";
    }

    let defaultChoiceError = "";
    let defaultChoiceWarning = "";

    if (
        defaultChoiceData.validation.errorCode === ERROR_CODES.TooMany &&
        updatedAt
    ) {
        defaultChoiceError =
            "The entered value is new and not one of the existing choices. The maximum number of entries has been reached. Please select an existing option.";
    }
    if (
        defaultChoiceData.validation.warnCode === WARN_CODES.TooLong &&
        updatedAt
    ) {
        defaultChoiceWarning = `The entered text exceeds the maximum length of ${TEXT_VALUE_MAX_LENGTH} characters and will be truncated upon submission`;
    }

    let labelError = "";
    let labelWarning = "";

    if (labelData.validation.errorCode === ERROR_CODES.Required && updatedAt) {
        labelError = "This field is required and cannot be left empty";
    }
    if (labelData.validation.warnCode === WARN_CODES.TooLong && updatedAt) {
        labelWarning = `The entered text exceeds the maximum length of ${TEXT_VALUE_MAX_LENGTH} characters and will be truncated upon submission`;
    }

    let newChoiceError = "";
    let newChoiceWarning = "";
    let newChoiceDescription = "";

    if (
        newChoiceData.validation.errorCode === ERROR_CODES.Duplicated &&
        updatedAt
    ) {
        newChoiceError = "This value already exists in the list";
    } else if (
        newChoiceData.validation.warnCode === WARN_CODES.TooLong &&
        updatedAt
    ) {
        newChoiceWarning = `The entered text exceeds the maximum length of ${TEXT_VALUE_MAX_LENGTH} characters and will be truncated upon submission`;
    } else if (
        newChoiceData.validation.warnCode === WARN_CODES.TooMany &&
        updatedAt
    ) {
        newChoiceDescription = "You have reached the maximum number of items";
    }

    function handleAddNewChoice() {
        addNewChoice();
    }

    function handleDefaultChoiceChange(event: ChangeEvent<HTMLInputElement>) {
        setDefaultChoice(event.target.value);
    }

    function handleDefaultChoiceSelect(
        value: State["fields"]["defaultChoice"]["value"],
    ) {
        setDefaultChoice(value);
    }

    function handleDisplayOrderSelect(event: ChangeEvent<HTMLSelectElement>) {
        setDisplayOrder(
            event.target.value as State["fields"]["displayOrder"]["value"],
        );
    }

    function handleLabelChange(event: ChangeEvent<HTMLInputElement>) {
        setLabel(event.target.value);
    }

    function handleMultiselectChange(event: ChangeEvent<HTMLInputElement>) {
        setMultiselect(event.target.checked);
    }

    function handleNewChoiceChange(event: ChangeEvent<HTMLInputElement>) {
        setNewChoice(event.target.value);
    }

    function handleRemoveChoice(index: number) {
        if (!isPending) {
            removeChoice(index);
        }
    }

    function handleRequiredChange(event: ChangeEvent<HTMLInputElement>) {
        setRequired(event.target.checked);
    }

    function handleReset() {
        resetAll();
        resetMutationState();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        mutate();
    }

    return (
        <Container title="Field Builder">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="label"
                    name="label"
                    autoFocus
                    disabled={isLabelInputDisabled}
                    label="Label"
                    placeholder="Enter field label"
                    required
                    value={label}
                    error={labelError}
                    warning={labelWarning}
                    onChange={handleLabelChange}
                />

                <List
                    label="Choices"
                    description={choicesDescription}
                    error={choicesError}
                    required
                    warning={choicesWarning}
                >
                    {choices.map((name, idx) => (
                        <Item
                            key={`${name}-${idx}`}
                            name={name}
                            maxLength={TEXT_VALUE_MAX_LENGTH}
                            onDelete={() => handleRemoveChoice(idx)}
                        />
                    ))}
                </List>

                <TextField
                    id="new-choice"
                    name="new_choice"
                    border="dashed"
                    description={newChoiceDescription}
                    disabled={isNewChoiceInputDisabled}
                    inputButtonDisabled={isNewChoiceInputButtonDisabled}
                    InputButtonIcon={IoMdAdd}
                    inputButtonOnClick={handleAddNewChoice}
                    label="New Choice"
                    placeholder={"Enter choice value"}
                    value={newChoice}
                    error={newChoiceError}
                    warning={newChoiceWarning}
                    onChange={handleNewChoiceChange}
                />

                <Select
                    id="display-order"
                    name="display_order"
                    disabled={isDisplayOrderSelectDisabled}
                    label="Display order"
                    options={displayOrderOptions}
                    optionLabels={displayOrderOptionLabels}
                    required
                    value={displayOrder}
                    onChange={handleDisplayOrderSelect}
                />

                <SearchWithSuggestions
                    id="default-choice"
                    name="default_choice"
                    disabled={isDefaultChoiceDropdownDisabled}
                    inputRef={defaultChoiceInputRef}
                    isDropdownVisible={isDefaultChoiceDropdownVisible}
                    label="Default Choice"
                    placeholder="Select a default choice"
                    suggestions={defaultChoiceSuggestions}
                    value={defaultChoice}
                    error={defaultChoiceError}
                    warning={defaultChoiceWarning}
                    onChange={handleDefaultChoiceChange}
                    onSelect={handleDefaultChoiceSelect}
                />

                <Checkbox
                    id="multiselect"
                    name="multiselect"
                    checked={multiselect}
                    description="Choose whether users can select multiple options or only one option"
                    disabled={isMultiselectCheckboxDisabled}
                    label="Multi-select"
                    onChange={handleMultiselectChange}
                />

                <Checkbox
                    id="required"
                    name="required"
                    checked={required}
                    description="End users must choose an option before submitting the form"
                    disabled={isRequiredCheckboxDisabled}
                    label="Mandatory Selection"
                    onChange={handleRequiredChange}
                />

                <ButtonGroup>
                    <Button
                        colorKind="primary"
                        disabled={isSubmitButtonDisabled}
                        kind="solid"
                        width="auto"
                    >
                        {submitButtonLabel}
                    </Button>
                    <Button
                        colorKind="secondary"
                        disabled={isResetButtonDisabled}
                        kind="outline"
                        type="button"
                        width="auto"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </ButtonGroup>
            </form>

            {isPending ? (
                <Banner message="Submitting your data, please wait..." />
            ) : null}
            {isSuccess ? (
                <Banner
                    message="Data submitted successfully! You can continue editing the data or reset the form to start fresh with a blank slate."
                    variant="success"
                />
            ) : null}
            {error ? (
                <Banner
                    message={`Submission failed. Please try again. ${error.message}`}
                    variant="error"
                />
            ) : null}
        </Container>
    );
}
