import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Divider, HStack, Image, VStack } from "@chakra-ui/react";
import { useBookmarkStore } from "../stores/use-bookmark-store";
import { BookmarkElement } from "../models/bookmark";

type Inputs = {
  faviconUrl: string;
  group: string;
  subGroup: string;
  title: string;
  url: string;
};

export const CreateBookmarkForm: React.FC = () => {
  const addBookmark = useBookmarkStore((state) => state.addBookMark);

  const {
    handleSubmit,
    getValues,
    setValue,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const urlWatch = watch("url");
  const faviconUrlWatch = watch("faviconUrl");

  useEffect(() => {
    async function setFieldValues() {
      const url = getValues("url");
      setValue("faviconUrl", ` https://f1.allesedv.com/${url}`);
      setValue("title", await getTitleFromURL(url).then((data) => data));
    }
    setFieldValues();
  }, [getValues, setValue, urlWatch]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        addBookmark(
          {
            faviconUrl: data.faviconUrl,
            label: data.title,
            url: data.url,
          } as BookmarkElement,
          data.group,
          data.subGroup
        );
        resolve(data);
      }, 3000);
    });
  };

  const getTitleFromURL = (url: string) =>
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.querySelectorAll("title")[0];
        return title?.innerText;
      });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <FormControl isInvalid={!!errors.url}>
          <FormLabel htmlFor="url">URL</FormLabel>
          <Input
            id="url"
            placeholder="url"
            {...register("url", {
              required: "This is required",
              minLength: {
                value: 4,
                message: "Minimum length should be 4",
              },
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <Divider />
        <FormControl isInvalid={!!errors.faviconUrl}>
          <FormLabel htmlFor="faviconUrl">Favicon URL</FormLabel>
          <HStack>
            <Image
              src={faviconUrlWatch}
              width="32px"
              height="32px"
              fallbackSrc="favicon.ico"
            />
            <Input
              id="faviconUrl"
              placeholder="favicon url"
              {...register("faviconUrl", {
                required: "This is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
          </HStack>
          <FormErrorMessage>
            {errors.faviconUrl && errors.faviconUrl.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            placeholder="title"
            {...register("title", {
              required: "This is required",
              minLength: {
                value: 4,
                message: "Minimum length should be 4",
              },
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <Divider />
        <FormControl isInvalid={!!errors.group}>
          <FormLabel htmlFor="group">Group</FormLabel>
          <Input
            id="group"
            placeholder="group"
            {...register("group", {
              minLength: {
                value: 4,
                message: "Minimum length should be 4",
              },
            })}
          />
          <FormErrorMessage>
            {errors.group && errors.group.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.subGroup}>
          <FormLabel htmlFor="subGroup">Sub Group</FormLabel>
          <Input
            id="subGroup"
            placeholder="subGroup"
            {...register("subGroup", {
              minLength: {
                value: 4,
                message: "Minimum length should be 4",
              },
            })}
          />
          <FormErrorMessage>
            {errors.subGroup && errors.subGroup.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Create
        </Button>
      </VStack>
    </form>
  );
};
